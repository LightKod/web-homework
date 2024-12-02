const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const RefreshToken = sequelize.define('RefreshToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: 'id',
        // },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'refresh_tokens',
    timestamps: false,
});

// // Thiết lập quan hệ giữa các bảng
// User.hasMany(RefreshToken, { foreignKey: 'user_id' });
// RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = RefreshToken;
