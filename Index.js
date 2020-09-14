const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const { getAllVillains, getVillainsByName, saveNewVillain } = require('./Controllers/VillainCtrl')
// const villains = require('./villains')

app.get('/Villains/', getAllVillains)

// app.get('/:Name', getVillainsByName)

app.get('/Villains/Name/:Name', getVillainsByName)

app.post('/', bodyParser.json(), saveNewVillain)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 1337...')
})

/* function insertJs() {
  let result = 'INSERT INTO villains (name,slug,movie) VALUES ('
  // eslint-disable-next-line max-len
  const resultArr = villains.map(element => result + '\'' + element.name + '\',\'' + element.slug + '\',\'' + element.movie + '\')')

  // eslint-disable-next-line no-console
  console.log(resultArr)
}
// insertJs()
 */
