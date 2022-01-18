const express = require('express');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10




router.post('/register', async (req, res) => {
    // res.send('User registered')
    try {
        
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPswd = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            employee_id: req.body.employee_id,
            username: req.body.username,
            staff_email: req.body.staff_email,
            password: hashedPswd
            
        })

        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/login', (req, res) => {
    res.send('User logged in')
})


module.exports = router