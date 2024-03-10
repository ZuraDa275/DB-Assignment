// ORM - sequelize.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
  host: 'localhost',
});

const ProductCategory = sequelize.define('ProductCategory', {
  name: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modifiedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
});

const Discount = sequelize.define('Discount', {
  name: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.TEXT },
  discountPercent: { type: DataTypes.DECIMAL, allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modifiedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
});

const ProductInventory = sequelize.define('ProductInventory', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modifiedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.TEXT },
  SKU: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modifiedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
});

// Define relationships
ProductCategory.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(ProductCategory, { foreignKey: 'category_id' });

Discount.hasMany(Product, { foreignKey: 'discount_id' });
Product.belongsTo(Discount, { foreignKey: 'discount_id' });

ProductInventory.hasOne(Product, { foreignKey: 'inventory_id' });
Product.belongsTo(ProductInventory, { foreignKey: 'inventory_id' });

module.exports = { sequelize, ProductCategory, Discount, ProductInventory, Product };
