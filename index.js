import express from 'express'
import dotenv from 'dotenv';
import  sequelize  from './config/sequelizeConfig.js';
import { dbController } from './controller/dbController.js';


dotenv.config()
console.log(process.env.PORT);
const app = express()
const port = process.env.PORT || 4242

//Route to root
app.get('/', (request, response) => {
  console.log('hej verden');
  response.send('velkommen til min side hej hej');
})
app.use(dbController);

//Route to 404
app.get('*', (request, response) => {
  console.log('kan ikke finde');
   response.send('Page not found');
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