const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuario',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    timestamps: true,
    alter: false,
    createdAt: true,
    updatedAt: true,
});

module.exports = usuario;