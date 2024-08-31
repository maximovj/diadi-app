const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const usuario = require('./usuarioModel');

const diario = sequelize.define('diario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        defaultValue: 'N/A',
        allowNull: true,
    },
    contenido: {
        type: DataTypes.STRING,
        defaultValue: 'N/A',
        allowNull: true,
    }
}, {
    tableName: 'diario',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    timestamps: true,
    alter: false,
    createdAt: true,
    updatedAt: true,
});

// Definir la relación: Un Usuario tiene muchos Diaro
usuario.hasMany(diario, { foreignKey: 'usuario_id' });
diario.belongsTo(usuario, { foreignKey: 'usuario_id' });

module.exports = diario;