import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWD,
    {
        host: process.env.DBHOST,
        // Porten databasen kører på
        port: process.env.DBPORT,
        // Databasetype (MySQL)
        dialect: 'mysql'
    }
)

export default sequelize;