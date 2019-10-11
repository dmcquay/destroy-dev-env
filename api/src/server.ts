import express from 'express'

import config from './config'
import {createTodo, getAllTodos} from './todo-repo'
import {Todo} from './models'
import uuid from 'uuid'

const app = express()

app.get('/', (req, res) => {
    res.send(`Hello, ${config.greetingRecipientName}`)
})

app.get('/create-random-todo', async (req, res) => {
    const todo: Todo = {
        id: uuid.v4(),
        text: `Read page ${Math.floor(Math.random() * 1000)} of book`,
        createdAt: new Date(),
        completedAt: undefined
    }
    await createTodo(todo)
    res.send(todo)
})

app.get('/todos', async (req, res) => {
    const todos = await getAllTodos()
    res.send(todos)
})

app.listen(3001, (err) => {
    if (err) throw err
    console.log('http://localhost:3001/')
})