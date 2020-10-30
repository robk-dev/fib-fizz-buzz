const request = require('supertest');

describe('Fibonacci Basic APIs:', () => {
    it('Should return sequence of first 4 fib numbers, (indexed from 0):', async () => {
        const three_seq_len = [0, 1, 1, 2];

        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/seq/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(three_seq_len);
    });

    it('Should return sequence of first 100 fib numbers, (indexed from 0):', async () => {
        const expected_length = 100;

        const { body } = await request(process.env.BASE_URL)
            .get(`/fibonacci/seq/${expected_length - 1}`)
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result.length).toBe(expected_length);
    });

    it('Should return sequence of first 1mil fib numbers, (indexed from 0):', async () => {
        const expected_length = 1000000;

        const { body } = await request(process.env.BASE_URL)
            .get(`/fibonacci/seq/${expected_length - 1}`)
            .expect('Content-Type', /json/);

        const { result, status } = body;

        // console.log({ result });

        expect(status).toBe("OK");
        expect(result.length).toBe(expected_length);
    });
});

describe('Fibonacci numbers (indexed from 0):', () => {
    it('Should return the 0th fib number in sequence', async () => {
        const number = 0;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/0')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });
    it('Should return the 0th fib number in sequence if negative index requested', async () => {
        const number = 0;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/-9999999999')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });
    it('Should return the 2nd fib number in sequence', async () => {
        const number = 1;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/2')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });

    it('Should return the 4th fib number', async () => {
        const number = 3;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/4')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });


    it('Should return the 5th fib number', async () => {
        const number = 5;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/5')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });

    it('Should return the 7th fib number', async () => {
        const number = 13;
        const { body } = await request(process.env.BASE_URL)
            .get('/fibonacci/num/7')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toBe(number);
    });
});
