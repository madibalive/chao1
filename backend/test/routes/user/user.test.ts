import request from 'supertest';
import httpStatus from 'http-status';
import { expect } from 'chai';
import app from '../../../src/app';
import { sequelize } from '../../../src/config/sequelize';
import { UserModel } from '../../../src/models/user';

describe('GET /users', () => {
  const testUsers = [
    { name: 'A', email: 'a@mail.fr', hashedPassword: 'a' },
    { name: 'B', email: 'b@mail.fr', hashedPassword: 'b' },
    { name: 'C', email: 'c@mail.fr', hashedPassword: 'c' }
  ];

  before(async () => {
    await sequelize.sync({ force: true });
    await UserModel.bulkCreate(testUsers);
  });

  it('responds json with all users', async () => {
    await request(app)
      .get('/users')
      .expect(httpStatus.OK)
      .expect((res) => {
        expect(res.body).deep.equal(testUsers.map((u) => ({ name: u.name })));
      });
  });
});
