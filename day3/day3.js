const fs = require('fs');
const path = require('path')

const input = fs.readFileSync('input', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  return data;
})

const inputArray = input.split('\r\n');

const splitArray = inputArray.map( (el, i, array) => {
  return el.split('');
});

//calculate most common bit in each column, storing the most 
//common in gammaAwway ad the lest common in epsilonArray
let gammaArray = [];
let epsilonArray = [];

for (let i = 0; i < splitArray[0].length; i++) {
  let count = 0;
  for (let j = 0; j < splitArray.length; j++) {
    count += parseInt(splitArray[j][i]);
  }
  if (count >= splitArray.length/2) {
    gammaArray.push(1);
    epsilonArray.push(0);
  } else {
    gammaArray.push(0);
    epsilonArray.push(1);
  }
}

//output answer to part 1
console.log('The answer to part 1 is: ', parseInt(gammaArray.join(''),2) * parseInt(epsilonArray.join(''),2));


//calculate part 2
let ogArray = [...splitArray];
let co2Array = [...splitArray];

const columns = splitArray[0].length;


while (ogArray.length > 1) {
  for (let i = 0; i < columns; i++) {
    let count = 0;
    for (let j = 0; j < ogArray.length; j++) {
      count += parseInt(ogArray[j][i]);
    }
    if (count >= ogArray.length/2) {
      for (let j = 0; j < ogArray.length; ) {
        if (parseInt(ogArray[j][i]) !== 1) {
          ogArray.splice(j,1);
        } else {
          j++;
        }
      }
    } else {
      for (let j = 0; j < ogArray.length; ) {
        if (parseInt(ogArray[j][i]) === 1) {
          ogArray.splice(j,1);
        } else {
          j++;
        }
      }
    }
  }
  break;
}

while (co2Array.length > 1) {
  for (let i = 0; i < columns; i++) {
    let count = 0;
    for (let j = 0; j < co2Array.length; j++) {
      count += parseInt(co2Array[j][i]);
    }
    if (count >= co2Array.length/2) {
      for (let j = 0; j < co2Array.length; ) {
        if (parseInt(co2Array[j][i]) === 1) {
          co2Array.splice(j,1);
        } else {
          j++;
        }
      }
    } else {
      for (let j = 0; j < co2Array.length; ) {
        if (parseInt(co2Array[j][i]) !== 1) {
          co2Array.splice(j,1);
        } else {
          j++;
        }
      }
    }
    if (co2Array.length < 2) break;
  }
  break;
}

//output answer to part 2
console.log('Answer to part 2: ', parseInt(ogArray[0].join(''),2) * parseInt(co2Array[0].join(''),2));
