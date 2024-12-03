const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,      
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    tableName: 'tasks',
    timestamps: false, // Nếu không muốn sử dụng createdAt/updatedAt
});

module.exports = Task;
