const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const users = require('../db.js')

router.post('/signup', [
    // ! This is how I use express validator to *check* if the user input passes my condition, besides isEmail There is isBool, isStrongPassword, etc...
    check('email', "Please provide a valid Email").isEmail(),
    check('password', "Please provide a password greater than 5 characters").isLength({ min: 6 })

 
], (req, res) => {
    const { password, email} = req.body;
    // * validate the input from user
    // ! Use validation results with req passed in
    const errors = validationResult(req)
// ! If the array of errors is not empty, (user input error), throw a 400 error msg with the errors sent to user

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // * validate if user does not already exist

    let user = users.find((user) => {
        return user.email === email
    })

    if (user) { res.status(400).json({
        "errors": [
            {
                "msg": "This Email already exist"
            }
        ]
    })}
    

    res.send('Validation Passed')
})

module.exports = router;