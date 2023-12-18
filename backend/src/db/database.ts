import { Sequelize } from 'sequelize'

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: String(DB_PASSWORD),
  database: DB_NAME,
  logging: false,
})

export default sequelize
