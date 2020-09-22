// const villains = require('../villains')
const models = require('../Models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
}

const getVillainsByName = async (request, response) => {
  const { Name } = request.params

  if (!Name) {
    return response.status(400).send('Please enter slug')
  }
  else {
    const filtered = await models.villains.findOne({ where: { name: Name } })

    response.json(filtered)
  }
}

const saveNewVillain = async (request, response) => {
  try {
    const {
      name, movie, slug
    } = request.body

    if (!name || !movie || !slug) {
      return response.status(400).send('The following fields are required name, movie, slug')
    }
    const newVillain = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVillain)
  } catch (err) {
    return response.status(500).send('Unable to create hero')
  }

  // if (!name || !movie || !slug) {
  //   return response.status(400).send('The following fields are required name, movie, slug')
  // }
  // // else {
  // const foundPK = models.villains.findByPk(slug)

  // if (foundPK) {
  //   return response.status(400).send('The slug is already use')
  // }
  // else {
  //   const newVillain = await models.villains.create({ name, movie, slug })

  //   return response.status(201).send(newVillain)
  // }
  // // }
}

module.exports = {
  getAllVillains,
  getVillainsByName,
  saveNewVillain
}
