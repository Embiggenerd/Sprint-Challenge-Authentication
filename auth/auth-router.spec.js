const request = require('supertest'); // calling it "request" is a common practice
const db = require('../database/dbConfig')
// const knex = require('knex')(config)
const server = require('../api/server.js'); // this is our first red, file doesn't exist yet

describe('server.js', () => {

    const newUser = {
        username: "lala",
        password: "hehe"
    }

    let token

    beforeAll(() => {
        return db.migrate.latest();
        // you can here also seed your tables, if you have any seeding files
    });
    afterAll(() => {
        return db.migrate
            .rollback()
            .then(() => knex.destroy());
    });
    // http calls made with supertest return promises, we can use async/await if desired
    describe('register route', () => {
        it('should return an OK status code and id and username of new user', async () => {
            const expectedStatusCode = 200;
            const expectedBody = { id: 1, username: newUser.username }
            // do a get request to our api (server.js) and inspect the response
            const response = await request(server).post('/api/auth/register').send(newUser)

            expect(response.status).toEqual(expectedStatusCode);
            expect(response.body).toEqual(expectedBody)
        });
    });

    describe('login route', () => {
        it('should return a token on successful login', async () => {
            const expectedStatusCode = 200;

            const response = await request(server).post('/api/auth/login').send(newUser)

            expect(response.status).toEqual(expectedStatusCode)
            expect(response.body).toHaveProperty('token')

            token = response.body.token
        })
    })

    describe('jokes route', () => {
        it('should return jokes if auth token on header', async () => {
            const expectedStatusCode = 200;
            const jokesLength = 20

            const response = await request(server).get('/api/jokes').send(newUser).set({ Authorization: token })
            
            expect(response.status).toEqual(expectedStatusCode)
            expect(response.body.length).toEqual(jokesLength)
        })
    })
});


// describe('POST /users', function () {
//     it('responds with json', function (done) {
//         request(app)
//             .post('/users')
//             .send({ name: 'john' })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
// });