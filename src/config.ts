'use strict'

const e = process.env

export default {
    greetingRecipientName: e.GREETING_RECIPIENT_NAME || "World",
    pg: {
        user: e.PG_USER || 'postgres',
        host: e.PG_HOST || 'localhost',
        database: e.PG_DATABASE || 'todo',
        password: e.PG_PASSWORD || 'password',
        port: e.PG_PORT || 5432,
    }
}