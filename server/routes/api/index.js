const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
