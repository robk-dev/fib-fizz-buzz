let app = require('express')();

// no input validation, just basic solution

const { routes, fib } = require('./implementations');

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
app.get('/fibonacci/num/:number', (req, res) => {
    const { number } = req.params;
    const { last_num: response } = fib(number);

    res.json({ status: 'OK', result: response });
});

// returns a sequence
app.get('/fibonacci/seq/:number', (req, res) => {
    const { number } = req.params;
    const { sequence } = fib(number);

    res.json({ status: 'OK', result: sequence });
});

// /num/(fib || pointers || arr || list
// /seq/(fib || arr ||list)
app.get('/fib/:num_or_seq/:impl/:number/:prev_nums', (req, res) => {
    const { num_or_seq, impl, number, prev_nums } = req.params;

    if (!!routes[num_or_seq] && !!routes[num_or_seq][impl]) {
        const response = routes[num_or_seq][impl](number, prev_nums);
        return res.json({ status: 'OK', result: response });
    }

    return res.status(404).json({ status: '404' });
})


app = app.listen(1234);
console.log('listening @ http://localhost:1234');

module.exports = app;
