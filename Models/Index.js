const Sequelize = require('sequelize')

const villainsMdl = require('./villainsMdl')

const connection = new Sequelize('villains', 'villains', 'v1lla1n$', {
  host: 'localhost', dialect: 'mysql'
})

const villains = villainsMdl(connection, Sequelize)

module.exports = { villains }
