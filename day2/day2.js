const fs = require('fs');

const input = fs.readFileSync('input', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
})

const inputArray = input.split('\r\n');

let x = 0;
let y = 0;

//splitting each line into a 2 value array for ease of processing
const splitArray = inputArray.map( (el) => {
  return el.split(' ');
});


//calculating part1
splitArray.forEach( (el) => {
  switch ( el[0] ) {
    case 'forward':
      x += parseInt(el[1]);
      break;
    case 'down':
      y += parseInt(el[1]);
      break;
    case 'up':
      y -= parseInt(el[1]);
      break;
    default:
      break;
  }
});

//part1 output
console.log('Result from part 1: ',x*y);


let x2 = 0;
let y2 = 0;
let aim = 0;

//calculating part2
splitArray.forEach( (el) => {
  switch ( el[0] ) {
    case 'forward':
      x2 += parseInt(el[1]);
      y2 += parseInt(el[1]) * aim;
      break;
    case 'down':
      aim += parseInt(el[1]);
      break;
    case 'up':
      aim -= parseInt(el[1]);
      break;
    default:
      break;
  }
});

//part2 output
console.log('Result from part 2: ',x2*y2);