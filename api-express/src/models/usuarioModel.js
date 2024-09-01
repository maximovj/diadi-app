const { DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/sequelizeConfig.js');

const usuario = sequelizeConfig.define('usuario', {
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
    alter: true,
    createdAt: true,
    updatedAt: true,
});

module.exports = usuario;