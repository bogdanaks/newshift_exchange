import { DataSource } from 'typeorm'

import database from 'config/database'

export const connection = new DataSource({
  ...database,
  entities: ["src/models/**/*.entity.ts"],
})