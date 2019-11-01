import express from 'express'
import uuid from 'uuid'
import cors from 'cors'

import config from './config'
import {createTodo, getAllTodos} from './todo-repo'
import {Todo} from './models'
import {getSentiment} from './sentiment'
import {cacheFn} from './cache'

const app = express()

app.use(cors())

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
    const todosWithSentiment = await Promise.all(
        todos.map(todo => {
            const fetchFn = () => getSentiment(todo.text)
            return cacheFn(fetchFn, `todos-sentiment|${todo.id}`)
               .then(sentiment => ({...todo, sentiment}))
        }
    ))
    res.send(todosWithSentiment)
})

app.listen(3001, (err) => {
    if (err) throw err
    console.log('API running at http://localhost:3001/')
})