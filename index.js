import express from 'express';
import dotenv from 'dotenv';
import  sequelize  from './config/sequelizeConfig.js';
import { dbController } from './controller/dbController.js';
import {carController } from './controller/carController.js';


dotenv.config()
console.log(process.env.PORT);
const app = express()
const port = process.env.PORT || 4242
app.use(express.urlencoded({ extended: true }));

//Route to root
app.get('/', (request, response) => {
  console.log('hej verden');
  response.send('velkommen til min side hej hej');
})
app.use(dbController, carController )


//Route to 404
app.get('*', (request, response) => {
  console.log('kan ikke finde');
   response.send('Page not found');
})
  

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

  app.get('/sync', async (req, res) => {
    try {
      const resp = await sequelize.sync();
      res.send('Data successfully synchronized');
    }
    catch(err) {
      res.send(err);
    }
  });

dotenv.config();