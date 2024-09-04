const { DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/sequelizeConfig.js');
const usuario = require('./usuarioModel');

// Configura un modelo asociado a una tabla 
// de la base de datos
const diario = sequelizeConfig.define('diario', {
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
    alter: true,
    createdAt: true,
    updatedAt: true,
});

// Definir la relación: Un Usuario tiene muchos Diaro
usuario.hasMany(diario, { foreignKey: 'usuario_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
diario.belongsTo(usuario, { foreignKey: 'usuario_id' });

module.exports = diario;