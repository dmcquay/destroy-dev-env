'use strict'

const express = require('express')
const marked = require('marked')
const fs = require('fs')
const fetch = require('node-fetch')

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

app.get('/start', async (req, res) => {
    const apiHealthResponse = await fetch('http://localhost:3001/todos')
    const uiHealthResponse = await fetch('http://localhost:3000/')
    const readmeMarkdown = fs.readFileSync('../README.md').toString()
    res.render('start', {
        readme: marked(readmeMarkdown),
        statuses: {
            api: apiHealthResponse.status === 200 ? 'healthy' : 'not healthy',
            ui: uiHealthResponse.status === 200 ? 'healthy' : 'not healthy'
        }
    })
})

app.listen(3002, () => {
    console.log('Mocks running at http://localhost:3002/')
})