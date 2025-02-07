import express from "express";
import { userModel } from "../models/userModel.js";

export const userController = express.Router();

userController.get('/users', async (req, res) =>{
    try {
        let users = await userModel.findAll();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Ingen bruger fundet" });
        }
        res.json(cars);
    } catch (error) {
        res.status(500).send({
            message: `Fejl i kald af userModel: ${error}`
        });
    }
})

userController.get('/users/:id([0-9]*)', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        let result = await userModel.findOne({
            where: { id: id }
        });
        if (!result) {
            return res.status(404).json({ message: `user med id ${id} ikke fundet` });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: `Fejl i kald af userModel: ${error.message}`
        });
    }
})

userController.post('/users', async (req, res) => {

    const { id, firstname, middlename, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Du skal udfylde alle felter" });
    }

    try {
        const result = await userModel.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Fejl ved oprettelse af user:", error);
        res.status(500).json({ message: `Fejl i oprettelse af userModel: ${error.message}` });
    }
});


userController.put('/users', async (req, res) => {

    const { id, firstname, middlename, lastname, email, password } = req.body;
    if (id && firstname && middlename && lastname && email && password) {
        try {
            const result = await userModel.update(
                { firstname, middlename, lastname, email, password }, // De nye værdier
                { where: { id } } // Finder bilen baseret på ID
            );

            // Tjekker om en række blev opdateret (result[0] er antal rækker opdateret)
            if (result[0] > 0) {
                res.status(200).json({ message: `User ${firstname} ${lastname} er opdateret succesfuldt` });
            } else {
                res.status(404).json({ message: "user ikke fundet" });
            }
        } catch (error) {
            res.status(500).json({
                message: `Fejl ved opdatering af userModel: ${error.message}`
            });
        }
    } else {
        res.status(400).send({
            message: "Fejl i opdatering af userModel: Mangler data"
        });
    }
});

// Route to delete (DELETE)
userController.delete('/users/:id([0-9]*)', async (req, res) => {

    // Henter ID fra URL-parametrene
    const { id } = req.params;
    // Tjekker om et ID er angivet
    if (id) {
        try {
            // Forsøger at slette bilen fra databasen baseret på ID
            await userModel.destroy({
                where: { id }
            });
            //success delete
            res.status(200).send({
                message: `user med id #${id} er slettet`
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