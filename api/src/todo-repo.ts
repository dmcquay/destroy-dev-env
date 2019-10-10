import { Pool } from 'pg'

import config from './config'
import {Todo} from './models'

const pool = new Pool(config.pgPoolConfig)

export async function createTodo(todo: Todo) {
    const query = 'INSERT INTO todo_item (id, text, created_at, completed_at) VALUES ($1, $2, $3, $4)'
    await pool.query(query, [todo.id, todo.text, todo.createdAt, todo.completedAt])
}

function transformDbRowToTodo(dbRow:any):Todo {
    return {
        id: dbRow.id as string,
        text: dbRow.text as string,
        createdAt: new Date(dbRow.created_at),
        completedAt: dbRow.completed_at ? new Date(dbRow.completed_at) : undefined
    }
}

export async function getAllTodos():Promise<Todo[]> {
    const query = 'SELECT * FROM todo_item'
    const result = await pool.query(query)
    const todos = result.rows.map(transformDbRowToTodo)
    return todos
}