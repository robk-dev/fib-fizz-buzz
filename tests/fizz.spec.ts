import { expect } from 'chai';
const request = require('supertest');

const app = require('../index');

describe('Fizz APIs:', () => {
    it('should return Fizz when divisible by 3', async () => {
        const { body } = await request(app)
            .get('/fizzbuzz/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal("Fizz");
    });

    it('should return Buzz when divisible by 5', async () => {
        const { body } = await request(app)
            .get('/fizzbuzz/5')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal("Buzz");
    });

    it('should return FizzBuzz when divisible by 3 & 5', async () => {
        const { body } = await request(app)
            .get('/fizzbuzz/15')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal("FizzBuzz");
    });

    it('should return the number when not divisible by 3 or 5', async () => {
        const num = 4;
        const { body } = await request(app)
            .get('/fizzbuzz/' + num.toString())
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).to.equal("OK");
        expect(result).to.equal(num.toString());
    });
});