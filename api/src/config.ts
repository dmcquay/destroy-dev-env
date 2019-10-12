import { PoolConfig } from 'pg'

const e = process.env

const pgPoolConfig: PoolConfig = {
    user: e.PG_USER || 'app',
    host: e.PG_HOST || 'localhost',
    database: e.PG_DATABASE || 'todo',
    password: e.PG_PASSWORD || 'password',
    port: parseInt(e.PG_PORT) || 5432
}

export default {
    greetingRecipientName: e.GREETING_RECIPIENT_NAME || 'World',
    pgPoolConfig,
    sentimentApiBaseUrl: e.SENTIMENT_API_BASE_URL || 'http://localhost:3002/sentiment'
}