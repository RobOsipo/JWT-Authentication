const express = require('express');
const auth = require('./routes/auth')
const app = express();
require('dotenv').config();
const connection = require('./connection.js')



app.use(express.json())
app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('welcome')
})

app.get('/users', (req, res) => {
    console.log('inside get /users route');
    const sql = 'SELECT * FROM users'
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(404).send('A problem occured' + err.sqlMessage)
        } else {
            res.json(rows)
        }
    })
})






app.listen(4005, () => {
    console.log('server listening on port 4005')
})