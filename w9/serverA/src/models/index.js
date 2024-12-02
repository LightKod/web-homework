const { Sequelize } = require('sequelize');

// Kết nối với MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, // Tắt log SQL (bật nếu cần để debug)
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL with Sequelize'))
    .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
