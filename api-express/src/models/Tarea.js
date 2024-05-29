const { DataTypes  } = require('sequelize');
const { sequelize } = require('../sequelize');
const Usuario = require('./Usuario');

const Tarea = sequelize.define('Tarea', {
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
},{
    tableName: 'tarea',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    timestamps: true,
    alter: false,
    createdAt: true,
    updatedAt: true,
});

// Definir la relación: Un Usuario tiene muchos Diaro
Usuario.hasMany(Tarea, { foreignKey: 'usuario_id' });
Tarea.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Tarea;