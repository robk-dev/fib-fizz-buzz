import { expect } from 'chai';
const request = require('supertest');

const app = require('../index');

describe('FibonacciS APIs:', () => {
    it('Should return sequence of first 4 fib numbers, (indexed from 0):', async () => {
        const three_seq_len = [0, 1, 1, 2];

        const { body } = await request(app)
            .get('/fibonaccis/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.deep.equal(three_seq_len);
    });

    it('Should return sequence of first 100 fib numbers, (indexed from 0):', async () => {
        const expected_length = 100;

        const { body } = await request(app)
            .get(`/fibonaccis/${expected_length - 1}`)
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result.length).to.deep.equal(expected_length);
    });

});

describe('Fibonacci numbers (indexed from 0):', () => {
    it('Should return the 0th fib number in sequence', async () => {
        const number = 0;
        const { body } = await request(app)
            .get('/fibonacci/0')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(number);
    });
    it('Should return the 2nd fib number in sequence', async () => {
        const number = 1;
        const { body } = await request(app)
            .get('/fibonacci/2')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(number);
    });

    it('Should return the 4th fib number', async () => {
        const number = 3;
        const { body } = await request(app)
            .get('/fibonacci/4')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(number);
    });


    it('Should return the 5th fib number', async () => {
        const number = 5;
        const { body } = await request(app)
            .get('/fibonacci/5')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(number);
    });

    it('Should return the 7th fib number', async () => {
        const number = 13;
        const { body } = await request(app)
            .get('/fibonacci/7')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(number);
    });
});
