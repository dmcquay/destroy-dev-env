import express from 'express'

import config from './config'

const app = express()

app.get('/', (req, res) => {
    res.send(`Hello, ${config.greetingRecipientName}`)
})

app.listen(3000, (err) => {
    if (err) throw err
    console.log('http://localhost:3000/')
})