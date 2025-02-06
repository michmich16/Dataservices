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
carController.put('/cars', async (req, res) => {

    const { brand, year, id, model, color, price } = req.body;
    if (id && brand && year && model && color && price) {
        try {
            // Opdaterer bilen i databasen baseret på det givne ID
            const result = await carModel.update(
                { brand, year, model, color, price }, // De nye værdier
                { where: { id } } // Finder bilen baseret på ID
            );

            // Tjekker om en række blev opdateret (result[0] er antal rækker opdateret)
            if (result[0] > 0) {
                res.status(200).json({ message: `Bil ${year} ${brand} ${model} opdateret succesfuldt` });
            } else {
                res.status(404).json({ message: "Bil ikke fundet" });
            }
        } catch (error) {
            res.status(500).json({
                message: `Fejl ved opdatering af carModel: ${error.message}`
            });
        }
    } else {
        res.status(400).send({
            message: "Fejl i opdatering af carModel: Mangler data"
        });
    }
});

// Route to delete (DELETE)
carController.delete('/cars/:id([0-9]*)', async (req, res) => {

    // Henter ID fra URL-parametrene
    const { id } = req.params;
    // Tjekker om et ID er angivet
    if (id) {
      try {
        // Forsøger at slette bilen fra databasen baseret på ID
        await carModel.destroy({
          where: { id }
        });
        //success delete
        res.status(200).send({
          message: `Bilen med id #${id} er slettet`
        });
      } catch (error) {
        // Send en HTTP-statuskode 500 hvis der opstår en fejl
        res.status(500).send({
          message: `Kunne ikke slette bilen: ${error.message}`
        });
      }
    } else {
      // Sender 400 Bad Request-fejl hvis ID er ugyldigt 
      res.status(400).send({
        message: "Id er ugyldigt"
      });
    }
  });