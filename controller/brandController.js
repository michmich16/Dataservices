import express from "express";
import { brandModel } from "../models/brandModel.js";

export const brandController = express.Router()

//Route to list
brandController.get('/cars', async (req, res) => {
    try {
        // Henter alle biler fra db ved at kalde `findAll` på carModel
        let cars = await brandModel.findAll({name, logo_url});

        // Tjekker om listen er tom eller `undefined`
        if (!name || !logo_url) {
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
    brandModel.hasMany(carModel);
});
//Route to details
brandController.get('/cars/:id([0-9]*)', async (req, res) => {
    try {
        // Konverterer ID til et heltal
        const id = parseInt(req.params.id, 10);

        // Finder bilen i databasen baseret på ID
        let result = await brandModel.findOne({
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
brandController.post('/cars', async (req, res) => {

    const { name, logo_url } = req.body;
    if (!name || !logo_url) {
        return res.status(400).json({ message: "Du skal udfylde alle felter" });
    }

    try {
        // Opretter en ny bil i databasen med de angivne oplysninger
        const result = await brandModel.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Fejl ved oprettelse af bil:", error);
        res.status(500).json({ message: `Fejl i oprettelse af carModel: ${error.message}` });
    }
});


//Route to update (PUT)
brandController.put('/cars', async (req, res) => {

    const { name, logo_url } = req.body;
    if (name && logo_url) {
        try {
            // Opdaterer bilen i databasen baseret på det givne ID
            const result = await brandModel.update(
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
brandController.delete('/cars/:id([0-9]*)', async (req, res) => {

    // Henter ID fra URL-parametrene
    const { id } = req.params;
    // Tjekker om et ID er angivet
    if (id) {
        try {
            // Forsøger at slette bilen fra databasen baseret på ID
            await brandModel.destroy({
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
