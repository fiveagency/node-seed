import _ from 'lodash';
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid/v4';
import bluebird from 'bluebird';
import { apiUrl } from '../config';
import { getSerializer, jsonApiContentType, parseResponse, verifyEquality } from '../common';
chai.use(chaiHttp);
chai.should();

const serializer = getSerializer('animals', ['name']);

const generateAnimal = () => {
  return {
    name: uuid(),
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const animalCount = 4;
const animals = _.times(animalCount, () => generateAnimal());
const deserializedAnimals: any[] = [];

describe('Animals', () => {
  // before('bootstrap', async () => {});

  // after('tear down', async () => {});

  it('find should return 0 animals', (done) => {
    chai
      .request(apiUrl)
      .get('/v1/animals')
      .set('accept', 'application/vnd.api+json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');

          const items: [] = res.body.data;
          chai.assert(_.isArray(items), 'Expected an array of animals');
          chai.assert(_.size(items) === 0, 'Got more than 0 animals');

          done();
        }
      });
  });

  it('all should return 0 animals', (done) => {
    chai
      .request(apiUrl)
      .get('/v1/animals/all')
      .set('accept', 'application/vnd.api+json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');

          const items: [] = res.body.data;
          chai.assert(_.isArray(items), 'Expected an array of animals');
          chai.assert(_.size(items) === 0, 'Got more than 0 animals');

          done();
        }
      });
  });

  it('should be able to create animals', async () => {
    const requester = chai.request(apiUrl).keepOpen();

    const responses = await bluebird.map(animals, (animal) => {
      const serialized = serializer.serialize(animal);
      return requester
        .post('/v1/animals')
        .set('accept', 'application/vnd.api+json')
        .set('content-type', jsonApiContentType)
        .send(serialized);
    });
    requester.close();

    const items: any = await bluebird.map(responses, (res) => parseResponse(res.body));
    deserializedAnimals.push(...items);

    const data = _.map(_.zip(animals, responses, deserializedAnimals), (item) => {
      return {
        animal: item[0],
        res: item[1],
        deserialized: item[2],
      };
    });
    for (const item of data) {
      const { animal } = item;
      const res: any = item.res;
      const deserialized: any = item.deserialized;

      chai.assert(!!res, `Response is ${res.body}`);
      res.should.have.status(201);
      res.body.should.be.a('object');

      chai.assert(verifyEquality(animal, deserialized), `Expected basic equality in ${animal} and ${deserialized}`);
      chai.assert(!!deserialized.createdAt && !!deserialized.updatedAt, 'Expected timestamps back');
      chai.assert(!_.isEmpty(deserialized.id), 'Expected an id present');
    }
  });

  it('should find page of animals', async () => {
    const res = await chai
      .request(apiUrl)
      .get('/v1/animals')
      .set('accept', 'application/vnd.api+json')
      .query({ 'page[offset]': 0, 'page[limit]': 2, sort: 'id' })
      .send();

    res.should.have.status(200);
    res.body.should.be.a('object');

    const data = await parseResponse(res.body);
    chai.assert(!!data && data.length === 2, `Expected to get 2 animals but got ${data.length}`);

    const firstAnimal = _.minBy(deserializedAnimals, (animal) => animal.id);
    chai.assert(
      verifyEquality(firstAnimal, data[0]),
      `Expected equality between ${JSON.stringify(firstAnimal, null, 2)} and ${JSON.stringify(data, null, 2)}`,
    );
  });

  it('should retrieve all animals', async () => {
    const res = await chai.request(apiUrl).get('/v1/animals/all').set('accept', 'application/vnd.api+json').send();

    res.should.have.status(200);
    res.body.should.be.a('object');

    const retrievedAnimals = await parseResponse(res.body);
    chai.assert(
      !!retrievedAnimals && retrievedAnimals.length === animalCount,
      `Expected to get ${animalCount} animals but got ${retrievedAnimals.length}`,
    );

    const originals = _.orderBy(deserializedAnimals, (animal) => animal.id);
    for (const pair of _.zip(originals, retrievedAnimals)) {
      const original = pair[0];
      const retrieved = pair[1];

      chai.assert(
        verifyEquality(original, retrieved),
        `Expected equality between ${JSON.stringify(original, null, 2)} and ${JSON.stringify(retrieved, null, 2)}`,
      );
    }
  });

  it('should fetch animals by id', async () => {
    const animal = deserializedAnimals[0];

    const res = await chai.request(apiUrl).get(`/v1/animals/${animal.id}`).set('accept', 'application/vnd.api+json');

    res.should.have.status(200);
    res.body.should.be.a('object');

    const retrieved = await parseResponse(res.body);

    chai.assert(verifyEquality(animal, retrieved), `Expected basic equality in ${animal} and ${retrieved}`);
  });

  it('should be able to delete animals', async () => {
    const animal = deserializedAnimals[0];

    const deleteRes = await chai
      .request(apiUrl)
      .delete(`/v1/animals/${animal.id}`)
      .set('accept', 'application/vnd.api+json');

    deleteRes.should.have.status(204);
    deleteRes.body.should.be.a('object');

    const getRes = await chai
      .request(apiUrl)
      .delete(`/v1/animals/${animal.id}`)
      .set('accept', 'application/vnd.api+json');
    getRes.should.have.status(404);
  });
});
