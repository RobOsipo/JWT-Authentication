const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const users = require('../db.js')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
// const connection = require('../connection.js')

router.post('/signup', [
    // ! This is how I use express validator to *check* if the user input passes my condition, besides isEmail There is isBool, isStrongPassword, etc...
    check('email', "Please provide a valid Email").isEmail(),
    check('password', "Please provide a password greater than 5 characters").isLength({ min: 6 })

 
], async (req, res) => {
    const { password, email} = req.body;

    // * validate the input from user
    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // * validate if user does not already exist

    let user = users.find((user) => {
        return user.email === email
    })

    if (user) { return res.status(400).json({
        "errors": [
            {
                "msg": "This Email already exist"
            }
        ]
    })}

    // * validate password

    const hashedPassword = await bcrypt.hash(password, 10)
    
    // ! The second parameter (secret) would normally comne from our .env file becuase its sensitive info
    const token = await JWT.sign({email}, "f33435jdssffa", {expiresIn: 36000} )
    
    // const sql = `INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`
    // connection.query(sql, (err, rows) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(404).send('A problem occured' + err.sqlMessage)
    //     } else {
    //         res.json(rows)
    //     }
    // })
    res.json({token})
})

router.get('/all', (req, res) => {
    res.json(users)
})

module.exports = router;