const express = require('express');

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const {
  protectProductOwner,
  productExists,
} = require('../middlewares/products.middlewares');

// Utils
const { upload } = require('../utils/multer.util');

const router = express.Router();

router.get('/', getAllProducts);

router.get('/categories', getAllCategories);

router.get('/:id', productExists, getProductById);

router.use(protectSession);

router.post(
  '/',
  upload.array('productImgs', 5),
  createProductValidations,
  checkValidations,
  createProduct
);

router.post('/categories', createCategory);

router.patch('/categories/:id', updateCategory);

router
  .use('/:id', productExists)
  .route('/:id')
  .patch(protectProductOwner, updateProduct)
  .delete(protectProductOwner, deleteProduct);

module.exports = { productsRouter: router };
