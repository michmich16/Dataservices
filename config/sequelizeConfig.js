import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

 if(!process.env.DBNAME || !process.env.DBUSER || !process.env.DBPASSWD || !process.env.DBHOST){
    console.error("error: Can not connect to database because of missing credentials!");
    process.exit(1)
 }

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWD,
    {
        host: process.env.DBHOST,
        // Porten databasen kører på
        port: process.env.DBPORT || 3306,
        // Databasetype (MySQL)
        dialect: 'mysql'
    }
)

sequelize.authenticate()
.then(() => console.log('connecting to database established'))
.catch(error => console.error(`could not connect to database: ${error}`))

export default sequelize;