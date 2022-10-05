// Models
const { Cart } = require('../models/cart.model');
const { Product } = require('../models/product.model');
const { ProductInCart } = require('../models/productInCart.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getUserCart = catchAsync(async (req, res, next) => {});

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

const purchaseCart = catchAsync(async (req, res, next) => {});

const removeProductFromCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
