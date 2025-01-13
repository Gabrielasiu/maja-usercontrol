// import models
const Product = require('./Product');
const User = require('./User');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
// Categories have many Products
User.hasMany(Product, {
  foreignKey: 'user_id'
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
  },
  foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
  },
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  User,
  Tag,
  ProductTag,
};
