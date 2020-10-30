const request = require('supertest');

describe('Fizz APIs:', () => {
    it('should return Fizz when divisible by 3', async () => {
        const { body } = await request(process.env.BASE_URL)
            .get('/fizzbuzz/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe("Fizz");
    });

    it('should return Buzz when divisible by 5', async () => {
        const { body } = await request(process.env.BASE_URL)
            .get('/fizzbuzz/5')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe("Buzz");
    });

    it('should return FizzBuzz when divisible by 3 & 5', async () => {
        const { body } = await request(process.env.BASE_URL)
            .get('/fizzbuzz/15')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe("FizzBuzz");
    });

    it('should return the number when not divisible by 3 or 5', async () => {
        const num = 4;
        const { body } = await request(process.env.BASE_URL)
            .get('/fizzbuzz/' + num.toString())
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(num.toString());
    });
});