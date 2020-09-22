const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { before, afterEach, describe, it } = require('mocha')
const { getAllVillains, getVillainsByName, saveNewVillain } = require('../../Controllers/VillainCtrl')
const models = require('../../Models/')
const { villainList, singleVillain } = require('../mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villains', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.villains, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('getAllVillains', async () => {
    it('should return a list of Villains', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainList)
    })
  })

  describe('getVillainsByName', () => {
    // eslint-disable-next-line max-len
    it('retrieves the villain associated with the provided name from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleVillain)

      const request = { params: { Name: 'Horned King' } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const stubbedJson = sinon.stub()
      const response = { status: stubbedStatus, json: stubbedJson }

      await getVillainsByName(request, response)
      // expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'found' } });
      expect(stubbedFindOne).to.have.been.calledWith({ where: { name: 'Horned King' } })
      expect(stubbedJson).to.have.been.calledWith(singleVillain)
    })

    it('should not find a hero', async () => {
      const request = { params: { Name: 'not-found' } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const stubbedJson = sinon.stub()
      const response = { status: stubbedStatus, json: stubbedJson }

      await getVillainsByName(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { name: 'not-found' } })
      expect(stubbedJson).to.have.been.calledWith(undefined)
    })
  })

  describe('saveNewVillain', () => {
    it('creates a villain', async () => {
      const villain = {
        name: 'Horned King',
        movie: 'The Black Cauldron',
        slug: 'horned-king',
      }
      const request = { body: villain }
      const stubStatus = sinon.stub()
      const stubSend = sinon.stub()
      const response = {
        status: stubStatus.returns({ send: stubSend }),
      }

      // sinon.stub(models.villains, 'findByPk').returns(null)
      sinon.stub(models.villains, 'create').returns(villain)

      await saveNewVillain(request, response)
      expect(stubStatus).to.be.calledWith(201)
      expect(stubSend).to.be.calledWith(villain)
    })
  })
})
