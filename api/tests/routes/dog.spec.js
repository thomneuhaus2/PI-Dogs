/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
/* const dog = {
  name: 'Pug',
  image: "",
  height: 
  {
    imperial: "4 - 9",
    metric: "2 - 4"
  },
  weight:
  {
    imperial: "4 - 9",
    metric: "2 - 4"
  },
  lifeSpan: "4 - 9",
  createdInDB: true,
  temperament:[{name:'Stubborn'}]
}; */

describe('Dog routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Dog.sync({ force: true }));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs?name=Yorkshire Terrier', () => {
    it('should get 200', () =>
      agent.get('/dogs?name=Yorkshire Terrier').expect(200)
    );
  });
  describe('GET /dogs?name=unknown', () => {
    it('should get 404', () =>
      agent.get('/dogs?name=unknown').expect(404)
    );
  });
});