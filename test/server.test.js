const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {
    it('true should be true', function () {
        expect(true).to.be.true;
    });

    it('2 + 2 should equal 4', function () {
        expect(2 + 2).to.equal(4);
    });
});

describe('Express static', function () {
    it('GET request "/" should return the index page', function () {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                expect(res).to.exist;
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });
});

describe('404 handler', function () {
    it('should respond with 404 when given a bad path', function () {
        return chai.request(app)
            .get('/DOES/NOT/EXIST')
            .then(res => {
                expect(res).to.have.status(404);
            });
    });
});

describe('Notes', function () {
    it('should return the default of 10 notes as an array', function () {
        return chai.request(app)
            .get('/api/notes')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');

                expect(res.body.length).to.be.at.least(1);

                const expectedKeys = ['id', 'title', 'content'];
                res.body.forEach(function (note) {
                    expect(note).to.be.a('object');
                    expect(note).to.include.keys(expectedKeys);
                });
            });
    });

    it('should return correct note object with id, title and content for a given id', function () {
        return chai.request(app)
            .get('/api/notes/')
            .then(function (res) {
                return chai.request(app)
                    .get(`/api/notes/${res.body[0].id}`)
                    .then(function (res) {
                        expect(res).to.have.status(200);

                    })

            });
    });

    it('should create and return a new item with location header when provided valid data', function () {
        const newNote = {
            title: 'noteway',
            content: 'lorembsum'
        };
        return chai.request(app)
            .post('/api/notes')
            .send(newNote)
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'title', 'content');
                expect(res.body.id).to.not.equal(null);
                expect(res.body).to.deep.equal(Object.assign(newNote, {
                    id: res.body.id
                }));

            });
    });

    it('should update and return a note object when given valid data', function () {
        const updateData = {
            title: 'titledsds',
            content: 'blah blah blah'
        }
        return chai.request(app)
            .get('/api/notes')
            .then(function (res) {
                updateData.id = res.body[0].id;

                return chai.request(app)
                    .put(`/api/notes/${res.body[0].id}`)
                    .send(updateData)
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal(updateData);
            });
    });

    it('should delete an item by id', function () {

        return chai.request(app)
            .get('/api/notes')
            .then(function (res) {
                return chai.request(app)
                    .delete(`/api/notes/${res.body[0].id}`)
            })
            .then(function (res) {
                expect(res).to.have.status(204);
            });
    });
});