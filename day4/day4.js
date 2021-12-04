const fs = require('fs');

const input = fs.readFileSync('test-input', 'utf8', (err, data) => {
                if (err) {
                  console.log(err);
                  return;
                }
                return data;
              })

const inputArray = input.split(/\r\n\s*\r\n/);

let numbers = [];
let boards = [];

numbers = [...inputArray.shift().split(',')];

boards = [...inputArray];

boards = boards.map( (el) => {
  return el.split('\r\n');
});

boards.forEach( (el) => {
  el = el.map( (inel) => {
    return inel.split(/s*/);
  });
});

console.log(numbers);

console.log(boards);