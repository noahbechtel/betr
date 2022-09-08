const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  "107.21.69.192" || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
    USER: 'wvrkjswybvvpeu',
    PASSWORD: 'dc7ndd43c5aape',
    dialect:'postgres'
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
