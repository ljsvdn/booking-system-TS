import { Sequelize } from 'sequelize'

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

// initialize Sequelize with environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: String(DB_PASSWORD),
  database: DB_NAME,
  logging: false,
})

// test the connection to the database
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection to the database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testDatabaseConnection()

export default sequelize
