const { sequelize } = require('../models');

sequelize.sync({ force: true }).then(() => console.log('DB Sync'));