const request = require('supertest');

const expected_response = { last_num: 13, sequence: [0, 1, 1, 2, 3, 5, 8, 13] };

describe('Fibonacci Recursive:', () => {
    it('fib(7) should return the 8th fib numbers, (indexed from 0):', async () => {

        const { body } = await request(process.env.BASE_URL)
            .get('/fib/num/recurse/7/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(13);
    });

    it('fib(7) should return the 8th fib numbers, (indexed from 0):', async () => {

        const { body } = await request(process.env.BASE_URL)
            .get('/fib/num/naive-recurse/7/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(13);
    });
});

describe('Fibonacci 3 Sliding Pointers:', () => {
    it('fib(7, 3) should return the 8th fib numbers, (indexed from 0):', async () => {
        const last_num = { last_num: 44 };

        const { body } = await request(process.env.BASE_URL)
            .get('/fib/num/pointer/7/3')
            .expect('Content-Type', /json/);

        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(last_num);
    });

    it('fib(1000, 3) should return the 1000th fib number, (indexed from 0):', async () => {
        const { body } = await request(process.env.BASE_URL)
            .get('/fib/num/pointer/1000/3')
            .expect('Content-Type', /json/);

        const last_num = { last_num: 2.7588428077664853e+264 };
        const { result, status } = body;

        expect(status).toBe("OK");
        expect(result).toStrictEqual(last_num);
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
