import assert from 'assert'

assert(process.env.CN_API, 'CN_API not found')
assert(process.env.CN_API_KEY, 'CN_API_KEY not found')

const config = {
  CN_API: process.env.CN_API,
  CN_API_KEY: process.env.CN_API_KEY,
}

export = config
