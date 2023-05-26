const User = require('./user');
const Food = require('./recipe');

User.hasMany(Food, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Food.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Food };
