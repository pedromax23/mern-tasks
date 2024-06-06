import { Sequelize, Model, DataTypes } from 'sequelize';
import {
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    DB_NAME
} from './config.js'

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection();

export class Tarea extends Model {}
Tarea.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descripccion: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        usuario_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },
    {
        timestamps: false,
        sequelize,
        modelName: 'Tarea',
        tableName: 'tareas'
    }
)

export class Usuario extends Model {}
Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        gravatar: {
            type: DataTypes.STRING(255)
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'Usuario',
        tableName: 'usuarios',
    }
)


Usuario.hasMany(Tarea, { foreignKey: 'usuario_id', as: 'tareas' })
Tarea.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuarios' })