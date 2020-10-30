const request = require('supertest');

const sequence = [0, 1, 1, 2, 3, 5, 8, 13];
const expected_response = { last_num: 13, sequence: [0, 1, 1, 2, 3, 5, 8, 13] };

describe('Sliding Pointers:', () => {
    it('fib(7, 2) should return sequence of first 8 fib numbers, (indexed from 0):', async () => {
        const { body } = await request(process.env.BASE_URL)
            .get('/fib/seq/arr/7/2')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(expected_response);
    });
});

describe('Fibonacci Dynamic Number of Prev Numbers:', () => {
    describe('Sliding Array Window:', () => {
        it('fib(7, 2) should return sequence of first 8 fib numbers, (indexed from 0):', async () => {
            const { body } = await request(process.env.BASE_URL)
                .get('/fib/seq/arr/7/2')
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result).toStrictEqual(expected_response);
        });

        it('fib(99, 2) should return sequence of first 100 fib numbers, (indexed from 0):', async () => {
            const expected_length = 100;

            const { body } = await request(process.env.BASE_URL)
                .get(`/fib/seq/arr/${expected_length - 1}/2`)
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result.sequence.length).toBe(expected_length);
        });

        it('fib(1000000 - 1, 2) should return sequence of first 1mil fib numbers, (indexed from 0):', async () => {
            const expected_length = 1000000;

            const { body } = await request(process.env.BASE_URL)
                .get(`/fib/seq/arr/${expected_length - 1}/2`)
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result.sequence.length).toBe(expected_length);
        });
    });

    describe('Linked List with rolling sum:', () => {
        it('fib(8 - 1, 2) should return sequence of first 8 fib numbers, (indexed from 0):', async () => {

            const { body } = await request(process.env.BASE_URL)
                .get('/fib/seq/list/7/2')
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result).toStrictEqual(expected_response);
        });

        it('fib(100 - 1, 2) should return sequence of first 100 fib numbers, (indexed from 0):', async () => {
            const expected_length = 100;

            const { body } = await request(process.env.BASE_URL)
                .get(`/fib/seq/list/${expected_length - 1}/2`)
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result.sequence.length).toBe(expected_length);
        });

        it('fib(1000000 - 1, 2) should return sequence of first 1mil fib numbers, (indexed from 0):', async () => {
            const expected_length = 1000000;

            const { body } = await request(process.env.BASE_URL)
                .get(`/fib/seq/list/${expected_length - 1}/2`)
                .expect('Content-Type', /json/);

            const { result, status } = body;

            expect(status).toBe("OK");
            expect(result.sequence.length).toBe(expected_length);
        });
    });
});
