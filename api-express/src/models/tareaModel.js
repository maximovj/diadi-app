const { DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/sequelizeConfig.js');
const usuario = require('./usuarioModel');

const tarea = sequelizeConfig.define('tarea', {
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
    descripcion: {
        type: DataTypes.STRING,
        defaultValue: 'N/A',
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'todo', // !! todo [para hacer], inprocess [En proceso], done [Hecho]
        allowNull: true,
    },
    importancia: {
        type: DataTypes.STRING,
        defaultValue: 'baja',
        allowNull: true,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_limite: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'tarea',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    alter: true,
    createdAt: true,
    updatedAt: true,
});

// Definir la relación: Un Usuario tiene muchos Diaro
usuario.hasMany(tarea, { foreignKey: 'usuario_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
tarea.belongsTo(usuario, { foreignKey: 'usuario_id' });

module.exports = tarea;