const express = require('express')

const app = express()

const greetingRecipientName = process.env.GREETING_RECIPIENT_NAME || 'World'

app.get('/', (req, res) => {
    res.send(`Hello, ${greetingRecipientName}`)
})

app.listen(3000, (err) => {
    if (err) throw err
    console.log('http://localhost:3000/')
})