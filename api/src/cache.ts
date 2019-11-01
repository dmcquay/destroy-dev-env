import redis from 'redis'

import config from './config'

const client = redis.createClient(config.redisConfig)

export async function get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if (err) reject(err)
            else resolve(value)
        })
    })
}

export async function set(key: string, value: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

interface CacheResult<T> {
    cacheHit: boolean
    payload: T
}

export async function cacheFn<T>(fn: () => T, key:string): Promise<CacheResult<T>> {
    let payload
    let cacheHit = false
    const serializedValueFromCache = await get(key)
    if (serializedValueFromCache) {
        payload = JSON.parse(serializedValueFromCache)
        cacheHit = true
    } else {
        payload = await fn()
        const serializedValue = JSON.stringify(payload)
        await set(key, serializedValue)
    }
    const result = {
        cacheHit,
        payload
    }
    return result
}