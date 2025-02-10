import express from 'express';
import { carModel } from '../models/carModel.js';
import sequelize from '../config/sequelizeClient.js';

export const dbController = express.Router();

dbController.get('/sync', async (req, res) => {
  try {
    const resp = await sequelize.sync();
    res.send('Data has been successfully synchronized');
  }
  catch (error) {
    console.error(`Synchonization ${error}`);
  }
});
