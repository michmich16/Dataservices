import express from 'express'
import { brandModel } from '../models/brandModel.js'

export const brandController = express.Router()

// Route to list (READ)
brandController.get('/brands', async (req, res) => {
    try {
        const data = await brandModel.findAll({
            attributes: ['id', 'name', 'logo_url']
        })

        if (!data || data.length === 0) {
            return res.json({ message: 'No data found' })
        }
        res.json(data)
    } catch (error) {
        console.error(`Could not get brand list: ${error}`)
    }
})

// Route to details (READ)
brandController.get('/brands/:id([0-9]*)', async (req, res) => {
    try {
        const { id } = req.params
        const data = await brandModel.findOne({
            where: {
                id: id
            }
        })

        if (!data) {
            return res.json({ message: `Could not find brand on id #${id}` })
        }

        return res.json(data);

    } catch (error) {
        console.error(`Could not get brand details: ${error}`)
    }
})

// Route to create (CREATE)
brandController.post('/brands', async (req, res) => {
    const { name, logo_url } = req.body;

    if (!name || !logo_url) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await brandModel.create({
            name, logo_url
        })

        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create brand: ${error.message}` })
    }
})

// Route to update (UPDATE)
brandController.put('/brands', async (req, res) => {
    const { name, logo_url, id } = req.body;

    if (!id || !name ||!logo_url ) {
        return res.json({ message: 'Missing required data' })
    }

    try {
        const result = await brandModel.update({
            name, logo_url
        },
            { where: { id } }
        )
        if(result) {
            res.json({ message: `Updated id#${id}`})
        }
    } catch (error) {
        return res.json({ message: `Could not update brand: ${error.message}` })
    }
})

// Route to delete (DELETE)
brandController.delete('/brands/:id([0-9]*)', async (req, res) => {
    const { id } = req.params
    if(id) {
        try {
            await brandModel.destroy({
                where: { id }
            })
            res.send({
                message: `Record #${id} deleted`
            })
        } catch (error) {
            res.send(`Error! Could not delete brand: ${error}`)
        }
    } else {
        res.send({
            message: 'Id not valid'
        })
    }
    
    
})