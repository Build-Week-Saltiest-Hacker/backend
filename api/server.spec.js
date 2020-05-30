const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
});

test('POST register a user is successful', async () => {
    const res = await request(server)
        .post('/api/auth/register')
        .send({username: 'User1', email: 'User1@user.com', password: 'badpassword'})
    const password = 'badpassword'
    expect(res.status).toBe(201)
    expect(res.body.data).toMatchObject({
        username: 'User1',
        email: 'User1@user.com'
    })
    expect('badpassword').toEqual(expect.not.stringMatching(res.body.data.password))
});

test('POST login a user should be successful', async () => {
    const register = await request(server)
        .post('/api/auth/register')
        .send({username: 'User1', email: 'User1@user.com', password: 'badpassword'})
    const res = await request(server)
        .post('/api/auth/login')
        .send({username: 'User1', password: 'badpassword'})
    expect(res.status).toBe(200)
});