'use strict'

const express = require('express')
const marked = require('marked')
const fs = require('fs')
const fetch = require('node-fetch')

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use('/static', express.static('./static'))

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

async function getStatus(url) {
    let response
    try {
        response = await fetch(url)
        const success = response.status === 200
        const message = success ? 'Healthy' : 'Not healthy'
        return {success, message}
    } catch(err) {
        return {success: false, message: 'Not healthy'}
    }
}

const {exec} = require('child_process')
async function runApiTests() {
    return new Promise((resolve, reject) => {
        exec('npm test', {cwd: '../api'}, err => {
            if (err) {
                resolve({
                    success: false,
                    message: 'Tests not passing'
                })
            } else {
                resolve({
                    success: true,
                    message: 'All tests passing'
                })
            }
        })
    })
}

app.get('/start', async (req, res) => {
    const readmeMarkdown = fs.readFileSync('../README.md').toString()
    const statuses = {
        api: await getStatus('http://localhost:3001/todos'),
        ui: await getStatus('http://localhost:3000/'),
        apiTests: await runApiTests()
    }
    const everythingIsHealthy = Object.values(statuses).filter(x => !x.success).length === 0
    res.render('start', {
        readme: marked(readmeMarkdown),
        statuses,
        everythingIsHealthy
    })
})

app.listen(3002, () => {
    console.log('Mocks running at http://localhost:3002/')
})