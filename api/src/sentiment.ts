import fetch from 'node-fetch'

import config from './config'

export async function getSentiment(text:string):Promise<string> {
    const options = {
        method: 'POST',
        body: text,
        headers: {'Content-type': 'text/plain'}
    }
    const response = await fetch(`${config.sentimentApiBaseUrl}/analyze-text`, options)
    const data = await response.json()
    return data.sentiment as string
}