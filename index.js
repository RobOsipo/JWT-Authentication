const express = require('express');
const auth = require('./routes/auth')
const app = express();

app.use('/auth', auth)


app.get('/', (req, res) => {
    res.send('welcome')
})






app.listen(4005, () => {
    console.log('server listening on port 4005')
})