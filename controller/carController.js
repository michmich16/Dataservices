import express from "express";
import { carModel } from "../models/carModel.js";

export const carController = express.Router()

//Route to list
carController.get('/cars', async (req, res) => {
    try {
      // Henter alle biler fra db ved at kalde `findAll` på carModel
      let cars = await carModel.findAll();
  
      // Tjekker om listen er tom eller `undefined`
      if (!cars || cars.length === 0) {
        // Returnerer 404, hvis ingen biler er fundet
        return res.status(404).json({ message: "Ingen biler fundet" });
      }
      // Returnerer listen af biler som JSON
      res.json(cars);
    } catch (error) {
      // Returnerer en HTTP 500 statuskode med en fejlbesked
      res.status(500).send({
        message: `Fejl i kald af carModel: ${error}`
      });
    }
  });
//Route to details
carController.get('/cars/:id([0-9]*)', async (req, res) => {
    try {
        // Konverterer ID til et heltal
        const id = parseInt(req.params.id, 10);
    
        // Finder bilen i databasen baseret på ID
        let result = await carModel.findOne({
          where: { id: id }
        });
    
        // Hvis bilen ikke findes, returneres en 404-fejl
        if (!result) {
          return res.status(404).json({ message: `Bil med id ${id} ikke fundet` });
        }
    
        // Returnerer bilens data som JSON
        res.json(result);
      } catch (error) {
        // Returnerer en 500-fejl
        res.status(500).json({
          message: `Fejl i kald af carModel: ${error.message}`
        });
      }
})

//Route to creat (POST)
carController.post('/cars', async (req, res) => {

    const { brand, year, id, model, color, price } = req.body;
    if (!brand || !year || !id || !model || !color || !price) {
      return res.status(400).json({ message: "Du skal udfylde alle felter" });
    }
  
    try {
      // Opretter en ny bil i databasen med de angivne oplysninger
      const result = await carModel.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Fejl ved oprettelse af bil:", error);
      res.status(500).json({ message: `Fejl i oprettelse af carModel: ${error.message}` });
    }
  });


//Route to update (PUT)
carController.post('/cars', async (req, res) => {
    
    const { brand, year, id, model, color, price } = req.body;
    if (!brand || !year || !id || !model || !color || !price) {
      return res.status(400).json({ message: "Du skal udfylde alle felter" });
    }
  
    try {
      // Opretter en ny bil i databasen med de angivne oplysninger
      const result = await carModel.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Fejl ved oprettelse af bil:", error);
      res.status(500).json({ message: `Fejl i oprettelse af carModel: ${error.message}` });
    }
  });
