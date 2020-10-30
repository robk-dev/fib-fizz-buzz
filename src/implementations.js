const fib_num_1 = 0;
const fib_num_2 = 1;

// no recursion
// O(n) space & time complexity
const fib = (num) => {
    const arr = [fib_num_1];

    if (num && num >= 1) {
        arr.push(fib_num_2);

        while (arr.length <= num) {
            const n = arr[arr.length - 1] + arr[arr.length - 2];
            arr.push(n);
        }
    }

    return {
        last_num: arr[arr.length - 1],
        sequence: arr
    };
}

// no recursion
// O(n) time complexity O(1) space
const fib_pointers = (num) => {
    let num1 = fib_num_1;
    if (!num || num < 1) {
        return num1;
    }
    let num2 = fib_num_2;
    let num3 = fib_num_2;

    i = 2;
    let sum;
    while (i++ <= num) {
        sum = BigInt(num3 + num2 + num1);
        num1 = num2;
        num2 = num3;
        num3 = sum;
    }

    return {
        last_num: num3
    };
};


// app.get('/fib/num/pointers/:number/', (req, res) => {
//     const { number } = req.params;
//     const { last_num: response } = fib_pointers(number);

//     res.json({ status: 'OK', result: response });
// });


// app.get('/fib/num/arr/:number/:prev_nums', (req, res) => {
//     const { number, prev_nums } = req.params;
//     const { last_num: response } = fib_arr_sliding_window(number, prev_nums);

//     res.json({ status: 'OK', result: response });
// });

// app.get('/fib/num/list/:number/:prev_nums', (req, res) => {
//     const { number, prev_nums } = req.params;
//     const { last_num: response } = fib_ll(number, prev_nums);

//     res.json({ status: 'OK', result: response });
// });

// app.get('/fib/seq/arr/:number/:prev_nums', (req, res) => {
//     const { number, prev_nums } = req.params;
//     const { sequence: response } = fib_arr_sliding_window(number, prev_nums);

//     res.json({ status: 'OK', result: response });
// });

// app.get('/fib/seq/list/:number/:prev_nums', (req, res) => {
//     const { number, prev_nums } = req.params;
//     const { sequence: response } = fib_ll(number, prev_nums);

//     res.json({ status: 'OK', result: response });
// });

/**
 *
 *
 * @param {number} value
 */
function Node(value) {
    this.val = value;
    this.next = null;
    this.prev = null;
}

const linked_list = () => {
    let head, tail, rolling_sum = 0, length = 0;

    /**
     *
     *
     * @param {number} value
     * @return {void} 
     */
    const enqueue = (value) => {
        const node = new Node(value);
        rolling_sum += value;
        length++;
        if (!tail) {
            head = tail = node;
            return;
        }

        node.next = head;
        head.prev = node;
        head = node;
    }

    const dequeue = () => {
        const { val } = tail;
        rolling_sum -= val
        length--;

        if (head.val == val && !head.next && !tail.prev) { // if only one node
            head = tail = null;
            return val;
        }

        tail = tail.prev;
        tail.next = null;
        return val;
    }

    return {
        getHead: () => head,
        getTail: () => tail,
        getSum: () => rolling_sum,
        length,
        enqueue,
        dequeue
    };
}

// fib_arr sliding window of prev numbers
// O(n*prev_numbers) time complexity O(n) space complexity
const fib_arr_sliding_window = (num, prev_numbers) => {
    const arr = [fib_num_1];

    if (prev_numbers && prev_numbers >= 1 && num && num >= 1) {
        for (let i = 1, max = prev_numbers; i < max; i++) {
            arr[i] = fib_num_2; // initialize with 1s same as before
        }

        while (arr.length <= num) {
            let i = arr.length;
            let temp = 0;
            while (i-- > arr.length - prev_numbers) {
                temp += arr[i];
            }
            arr.push(temp);
        }
    }

    return {
        last_num: arr[arr.length - 1],
        sequence: arr
    };
}

// fib_ll_arr 
// time complexity is O(prev_numbers + num)
// space complexity can be O(prev_numbers) without the array
const fib_ll_arr = (num, prev_numbers) => {
    const ll = linked_list();
    const arr = [fib_num_1]; // can drop the array 
    ll.enqueue(fib_num_1);

    if (prev_numbers && prev_numbers >= 1 && num && num >= 1) {
        ll.enqueue(fib_num_2); // initialize with 1s same as before
        arr.push(fib_num_2);

        for (let i = 1, max = prev_numbers; i < max; i++) {
            const sum = ll.getSum()
            ll.enqueue(sum);
            arr.push(sum);
        }

        while (arr.length <= num) {
            ll.dequeue();
            const sum = ll.getSum()
            ll.enqueue(sum);
            arr.push(sum);
        }
    }

    return {
        last_num: arr[arr.length - 1],
        sequence: arr
    };
}

// fib_ll
// time complexity is O(prev_numbers + num)
// space complexity is O(prev_numbers)
const fib_ll = (num, prev_numbers) => {
    const ll = linked_list();
    ll.enqueue(fib_num_1);

    if (prev_numbers && prev_numbers >= 1 && num && num >= 1) {
        ll.enqueue(fib_num_2); // initialize with 1s same as before
        length = 2;

        for (let i = 1, max = prev_numbers; i < max; i++) {
            const sum = ll.getSum()
            ll.enqueue(sum);
        }

        while (length <= num) {
            ll.dequeue();
            const sum = ll.getSum()
            ll.enqueue(sum);
            length++;
        }
    }

    return {
        last_num: ll.getSum()
    };
}


const routes = {
    num: { fib, pointers: fib_pointers, arr: fib_arr_sliding_window, list: fib_ll },
    seq: { fib, arr: fib_arr_sliding_window, list: fib_ll_arr },
};

module.exports = { routes, fib };