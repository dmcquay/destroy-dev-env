'use strict'

const express = require('express')

const app = express()

const sentimentApi = express.Router()

const sentimentResponses = [
    'positive',
    'negative',
    'curious',
    'furious',
    'nefarious'
]
sentimentApi.post('/analyze-text', (req, res) => {
    let text = ''
    req.on('data', chunk => text += chunk)
    req.on('end', () => {
        const sentiment = sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)]
        res.send({
            text,
            sentiment
        })
    })
})

app.use('/sentiment', sentimentApi)

app.listen(3002, () => {
    console.log('Mocks running at http://localhost:3002/')
})