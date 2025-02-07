import express from 'express'
import { Authenticate } from '../utils/authUtils'

export const authController = express.Router()

authController.post('login', (req, res) =>{Authenticate(req,res)})