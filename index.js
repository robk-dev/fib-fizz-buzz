const app = require('express')();

app.get('/fizzbuzz/:number', (req, res) => {
    const { number } = req.params; // ignore string type from path/

    let response;

    if (number % 3 === 0 && number % 5 === 0) {
        response = 'FizzBuzz';
    } else if (number % 3 === 0) {
        response = 'Fizz';
    } else if (number % 5 === 0) {
        response = 'Buzz';
    } else {
        response = number;
    }

    res.json({ status: 'OK', result: response });
});

// returns last number
app.get('/fibonacci/:number', (req, res) => {
    const { number } = req.params;

    const { last_num: response } = fib(number);

    res.json({ status: 'OK', result: response });
});

// returns a sequence
app.get('/fibonaccis/:number', (req, res) => {
    const { number } = req.params;

    const { sequence } = fib(number);

    res.json({ status: 'OK', result: sequence });
});

// no recursion
const fib = (num) => {
    if (num == 0) {
        return {
            last_num: 0,
            sequence: [0]
        };
    }

    const fib_num_1 = 0;
    const fib_num_2 = 1;

    const arr = [fib_num_1, fib_num_2];

    while (arr.length <= num) {
        const n = arr[arr.length - 1] + arr[arr.length - 2];
        arr.push(n)
    }

    return {
        last_num: arr[arr.length - 1],
        sequence: arr
    };
}

app.listen(1234);
console.log('listening @ http://localhost:1234');

module.exports = app;