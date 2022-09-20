const User = require('./User');
const Journal = require('./Journal');

//create associations
User.hasMany(Journal, {foreignKey: 'user_id'});

Journal.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {User, Journal};