// Models
const { Cart } = require('../models/cart.model');
const { Product } = require('../models/product.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Order } = require('../models/order.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
    include: [
      {
        model: ProductInCart,
        where: { status: 'active' },
        include: { model: Product },
      },
    ],
  });

  if (!cart) {
    return next(new AppError('This user does not have a cart', 400));
  }

  res.status(200).json({
    status: 'success',
    data: { cart },
  });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  // Validate that requested qty doesnt exceed the available qty
  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Product does not exists', 404));
  } else if (quantity > product.quantity) {
    return next(
      new AppError(`This product only has ${product.quantity} items.`, 400)
    );
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    // Assign cart to user (create cart)
    const newCart = await Cart.create({ userId: sessionUser.id });

    await ProductInCart.create({ cartId: newCart.id, productId, quantity });
  } else {
    // Cart already exists
    const productInCart = await ProductInCart.findOne({
      where: { productId, cartId: cart.id },
    });

    if (!productInCart) {
      // Add product to current cart
      await ProductInCart.create({ cartId: cart.id, productId, quantity });
    } else if (productInCart.status === 'active') {
      return next(
        new AppError('This product is already active in your cart', 400)
      );
    } else if (productInCart.status === 'removed') {
      await productInCart.update({ status: 'active', quantity });
    }
  }

  res.status(200).json({
    status: 'success',
  });
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, newQty } = req.body;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    return next(new AppError('You do not have a cart active.', 400));
  }

  // Validate that requested qty doesnt exceed the available qty
  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Product does not exists', 404));
  } else if (newQty > product.quantity) {
    return next(
      new AppError(`This product only has ${product.quantity} items.`, 400)
    );
  } else if (0 > newQty) {
    return next(new AppError('Cannot send negative values', 400));
  }

  const productInCart = await ProductInCart.findOne({
    where: { cartId: cart.id, productId, status: 'active' },
  });

  if (!productInCart) {
    return next(new AppError('This product is not in your cart', 404));
  }

  if (newQty === 0) {
    // Remove product from cart
    await productInCart.update({ quantity: 0, status: 'removed' });
  } else if (newQty > 0) {
    await productInCart.update({ quantity: newQty });
  }

  res.status(200).json({
    status: 'success',
  });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
    include: {
      model: ProductInCart,
      status: 'active',
      include: { model: Product },
    },
  });

  if (!cart) {
    return next(new AppError('This user does not have a cart', 400));
  }

  // Loop through the products in the cart
  let totalPrice = 0;
  const cartPromises = cart.productInCarts.map(async productInCart => {
    // Update product to status purchased
    await productInCart.update({ status: 'purchased' });

    // Calculate total price
    const productPrice = productInCart.product.price * productInCart.quantity;

    totalPrice += productPrice;

    // Substract requested qty to product's current qty
    const newQty = productInCart.product.quantity - productInCart.quantity;

    await productInCart.product.update({ quantity: newQty });
  });

  await Promise.all(cartPromises);

  await cart.update({ status: 'purchased' });

  const newOrder = await Order.create({
    cartId: cart.id,
    userId: sessionUser.id,
    totalPrice,
  });

  res.status(201).json({
    status: 'success',
    data: { newOrder },
  });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId } = req.params;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    return next(new AppError('This user does not have a cart', 400));
  }

  const productInCart = await ProductInCart.findOne({
    where: { cartId: cart.id, productId, status: 'active' },
  });

  if (!productInCart) {
    return next(new AppError('This product is not in your cart', 400));
  }

  await productInCart.update({ quantity: 0, status: 'removed' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
