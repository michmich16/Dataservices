import express from 'express'
import dotenv from 'dotenv';
import  sequelize  from './config/sequelizeConfig.js';


dotenv.config()
console.log(process.env.PORT);
const app = express()
const port = process.env.PORT || 3000

app.get('/', (request, response) => {

   response.send('velkommen til min side');
})


app.get('/about', (request, response) => {

    response.send('velkommen til about side');
 })

 app.get('/contact', (req, res) => {
    res.send('Dette er kontakt siden...');
  });
  

app.listen(port, () =>{
    console.log(`server kører på http://localhost:${port}`);
})

app.get('/test', async (req, res) => {
    try {
      await sequelize.authenticate();
      console.log('Der er forbindelse til databasen');
      res.send('Der er forbindelse til databasen');
    } catch (error) {
      console.error('Fejl! Kunne ikke forbinde til databasen: ', error);
      res.status(500).send('Fejl! Kunne ikke forbinde til databasen.');
    }
  });

dotenv.config();