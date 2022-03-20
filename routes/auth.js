const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

router.post('/signup', [
    // ! This is how I use express validator to *check* if the user input passes my condition, besides isEmail There is isBool, isStrongPassword, etc...
    check('email').isEmail(),
    check('password').isLength({ min: 6 })

    // ! 
], (req, res) => {
    const { password, email} = req.body;
    // ! Use validation results with req passed in
    const errors = validationResult(req)
// ! If the array of errors is not empty, (user input error), throw a 400 error msg with the errors sent to user
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    

    res.send('Auth Route Working')
})

module.exports = router;