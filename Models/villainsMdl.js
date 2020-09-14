const villains = (connection, Sequelize) => {
  return connection.define('villains', {
    slug: { type: Sequelize.STRING, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING }
  })
}

module.exports = villains
