'use strict'

const express = require('express')
const marked = require('marked')
const fs = require('fs')

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

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

app.get('/start', (req, res) => {
    const readmeMarkdown = fs.readFileSync('../README.md').toString()
    res.render('start', {foo: 'bar', readme: marked(readmeMarkdown)})
})

app.listen(3002, () => {
    console.log('Mocks running at http://localhost:3002/')
})