# TDD Fibonacci & fizzbuzz on REST

> Basic solutions with no input validation for 2, 3 and dynamic number of previous numbers

```sh
npm i
npm test
```

## Fizzbuzz

> localhost:1234/fizzbuzz/number

## Fibonacci

> Number only, or number + sequence

### Available endpoints

* localhost:1234/num/(fib || pointer || arr || list)/n/prev_nums
* localhost:1234/seq/(fib || arr || list)/n/prev_nums // where list here uses an array to save sequence

## Notes

> Ignoring initialization step which would be at least O(prev_nums) for each complexity 
> not dominant term but would mean some take O(prev_numbers + n) time instead of O(n)

0. With static number of previous numbers, we can use 2, 3 or however many pointers needed and have O(n) time and O(1) space complexity

1. If entire sequence of numbers is needed, O(n) is the best space complexity we can get.

Otherwise, at worst O(prev_number) space is needed to maintain the set/pointers of previous numbers for the current sum; linear size that doesn't change with respects to input size n

2. With dynamic number of previous numbers, we want not to have to recalculate the sum for a given set more than once, so for each next number we want to do a constant amount of work instead of repeating ourselves; e.g:
   * sum += arr[i]; vs
   * arr[i] = arr[i-1] + arr[i-2]... + arr[i-prev_numbers]

### Recursive approaches

> Skipped altogether till writing notes

1. Recursion often gets taught on fib and it goes something like this:

```js
function fib(n) {
    // base cases
    if (n===0) return 0; // or 1
    if (n===1) return 1;

    // important part
    return fib(n-1) + fib(n-2);
}
```

2. Small example as to why that's bad

The call stack for such an implementation would look as follows:
|||||||||||||
|---|---|---|---|---|---|---|---|---|---|---|---|
||||||||      fib(5)|||   |
||||||    fib(4) || ||fib(3)| ||
|||||   fib(3)||fib(2) || fib(2)||fib(1) |
||||   fib(2)|fib(1)||fib(1)| fib(0) |fib(1)|fib(0)|fib(0)|0 
|||  fib(1)|fib(0) |fib(0)|0|fib(0)|0|fib(0)|0|0
|| fib(0)|0|0|0||0||0|||
|0|||||||||||

> where it would recursively go depth-first into leftmost of the tree/execution path - fib(n-1) until it gets to 0

that's

* 1x call for fib(5) & fib(4)
* 2x fib(3) calls
* 3x fib(2) calls
* 4x fib(1) calls
* 7x fib(0) calls
* etc

And this is just for the first 5 fibonacci numbers. The amount of work keeps doubling with each level

That's exponential O(2^n) time complexity. For more than 2 previous numbers, say 5, it'd be O(5^n)

We only need to calculate the value of each number once, everything else is wasted work, so caching/memoization via a hashmap or an indexed array which lets us check whether the number was already computed, would let us do a leftmost/depth-first recursion and eliminate almost all other execution paths 

For example:

```js
const map = { 1: 1 };
function fib(n) {
    // base cases
    if (n===0) return 0;
    if (!!map[n]) return map[n];

    // important part
    return fib(n-1) + fib(n-2);
}

```

|        |     |
| ------ | --- |
| fib(5) |     |
| fib(4) | 3   |
| fib(3) | 2   |
| fib(2) | 1   |
| fib(1) | 0   |
| fib(0) | 0   |
| 0      |     |

* Looking at the previous table, it will execute recursively/depth first fib(5), fib(4), ...fib(0), and then for every fib(n-2), we'll reach out break clause due to map - O(n+(1)) ~ O(n) time complexity
* Time complexity scales better with arbitrary large input like this as it doesn't have to repeat the same work more than once, it will let us break out early

### Iterative Approach

Looking back at the table above, it requires walking up from the base case up to the desired number.

Did basic implementation with keeping sequence in an array and summing of last 2 elements on each iteration, 3 sliding pointers, dynamic number of previous elements in the array, linked lists

Pointers implementation have O(n) time complexity & O(1) space complexity when only num is needed as we can maintain sum up until now and the values of the last 2 numbers, so space remains constant e.g:

```js
let num1=0, num2=1;
while (true) {
    let sum = num1+num2;
    num1=num2;
    num2=sum;
}
```

#### On Dynamic number of prev numbers

> Need to programmatically access each pointer/number at least once and maintain sum of current pointers/remove oldest

1. Naive array with dynamic number of previous numbers/double loop has O(n*prev_numbers) time complexity & O(n) space complexity with append only operations

```js
function fib(n, prev_nums) {
    let arr = [0,1];
    while (arr.length < n) {
        let sum = 0;
        for let(j = arr.length, min = n - prev_nums; j > min; j--) {
            sum + = arr[j];
        }
        // arr[i] = sum;
        arr.push(sum);
    }
}
```

* Naive array approach shown above is a double loop solution, where inner one is summing the prev_numbers, up to current_index - prev_nums for each number
    O(n*prev_numbers) time complexity, which is closer to O(n^2) for prev_numbers > n/2, think last 50bil numbers out of 100bil
    O(n) space complexity

Can keep appending to the end of the array, but to reduce the space complexity would need to keep dropping the unneeded elements from the start

* Naive queues with array.shift() aimed at reducing space complexity, would need to shift all elements one position over when dequeueing first,
   which is O(n) work on its own, so time would be O(n(n+prev_numbers)) to reduce space down to O(prev_numbers) which isn't the best approach if removing the first element requires shifting all others each iteration.

* Once we have a queue, we can keep a local value for the sum and increase it for each new number added and decrease it by each number removed

A naive queue implementation on top of an array would be O(n^2) on its own for this usecase.

### Optimizations

For time complexity, need to calculate the rolling sum of prev_numbers, so that for each next number it'll be O(1) work instead of O(prev_numbers)

* Need to store either the sum, point at the head and the tail, or O(prev_numbers) to calculate each number with sliding window

Can minimize space complexity if sequence is not needed from O(n) to O(prev_numbers), where (prev_numbers < n), while keeping time complexity related to removal operations linear with linked list.

In reality, space complexity is at least O(2*prev_numbers) due to pointers (and objects and other constraints), but 2 isn't the dominant term, so O(prev_numbers)

* Implemented using doubly linked list though singly linked one would've worked as well
* Linked list can be slower due to dynamically allocating each next node in different places in memory and having worse cache performance
* Best time complexity solution, i.e. O(1) or O(log(n)) would involve precomputing all the combinations for the set of all numbers up to infinity for each possible prev_numbers value, i.e. O(n!*prev_numbers!)

### Further work

* adding limits for up to BigInt(Number.MAX_SAFE_INTEGER) might be a good idea or forcing 32 bit math for faster addition
