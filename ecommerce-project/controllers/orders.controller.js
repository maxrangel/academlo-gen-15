// Models
const { Cart } = require('../models/cart.model');
const { Product } = require('../models/product.model');
const { ProductInCart } = require('../models/productInCart.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getUserCart = catchAsync(async (req, res, next) => {});

const addProductToCart = catchAsync(async (req, res, next) => {});

const updateProductInCart = catchAsync(async (req, res, next) => {});

const purchaseCart = catchAsync(async (req, res, next) => {});

const removeProductFromCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
