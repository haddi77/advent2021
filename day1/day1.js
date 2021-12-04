const fs = require('fs');

const input = fs.readFileSync('input', 'utf8', (err, data) => {
                if (err) {
                  console.log(err);
                  return;
                }
                return data;
              })

const inputArray = input.split('\r\n');

//cast values to int for comparison
const intArr = inputArray.map( (el) => {
  return parseInt(el);
});

//part1 compare each element to the one before
const checkArray = intArr.map( ( el, i, arr) => {
  return el > arr[i-1] ? 1 : 0;
});

//part1 count instances of increase
const count = checkArray.reduce( ( prev, curr) => {
  return prev + curr;
}, 0);

//output answer to part 1
console.log('Answer to part 1: ',count);

//part2 create array of sums of 3
const sumArray = intArr.map( (el, i, arr) => {
  return el + arr[i+1] + arr[i+2];
});

//remove last 2 elements of sum array since they are not valid
sumArray.splice(-2,2);

//check if each sum is larger then the previous one
const checkArray2 = sumArray.map( ( el, i, arr) => {
  return el > arr[i-1] ? 1 : 0;
});

//part2 count instance of increase
const count2 = checkArray2.reduce( ( prev, curr) => {
  return prev + curr;
}, 0);

//output answer to part 2
console.log('Answer to part 2: ',count2);