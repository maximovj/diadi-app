const { DataTypes  } = require('sequelize');
const { sequelize } = require('../sequelize');
const Usuario = require('./Usuario');

const Diario = sequelize.define('Diario', {
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
},{
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
Usuario.hasMany(Diario, { foreignKey: 'usuario_id' });
Diario.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Diario;