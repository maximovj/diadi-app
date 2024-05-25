const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Usuario = sequelize.define('Usuario', {
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
    tableName: 'diario',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    timestamps: true,
    alter: true,
    createdAt: true,
    updatedAt: true,
});

module.exports = Usuario;