import assert from 'assert'

import { DataSourceOptions } from 'typeorm'

assert(process.env.PG_USERNAME, 'PG_USERNAME not found')
assert(process.env.PG_PASSWORD, 'PG_PASSWORD not found')
assert(process.env.PG_DB_NAME, 'PG_DB_NAME not found')
assert(process.env.PG_HOST, 'PG_HOST not found')
assert(process.env.PG_PORT, 'PG_PORT not found')

export default <DataSourceOptions>{
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
}
