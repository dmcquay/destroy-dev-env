require("dotenv").config()

import typedConfig from '@dmcquay/typed-config'
import { PoolConfig } from 'pg'

const config = typedConfig(process.env)
const e = process.env

const pgPoolConfig: PoolConfig = {
    user: config.getString('PG_USER'),
    host: config.getString('PG_HOST'),
    database: config.getString('PG_DATABASE'),
    password: config.getString('PG_PASSWORD'),
    port: config.getInteger('PG_PORT')
}

const redisConfig = {
    host: config.getString('REDIS_HOST'),
    port: config.getInteger('REDIS_PORT')
}

export default {
    greetingRecipientName: config.getString('GREETING_RECIPIENT_NAME'),
    sentimentApiBaseUrl: config.getString('SENTIMENT_API_BASE_URL'),
    pgPoolConfig,
    redisConfig
}