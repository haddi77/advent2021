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

//Store the drawn numbers in a seperate array
numbers = [...inputArray.shift().split(',')];

//Store the rest of the input as an array of boards 
boards = [...inputArray];

//Split the boards into an array of rows
boards = boards.map( (el) => {
  return el.split('\r\n');
});

//split each row into an array of elements, 
//some elements have multiple spaces between them
boards.forEach( (board, i, array) => {
  array[i] = board.map( (row) => {
    return row.split(/(?<!^)\s+/g);
  });
  array[i].forEach( (row, j, array2) => {
    array2[j] = row.map( (el) => {
      return el.trim();
    });
  });
});

//create a hit map with all values initially zero for each board
let hits = boards.map( (board, i) => {
  return board.map( (el) => {
    return [0,0,0,0,0];
  });
});

//a function that takes in a winning board number and calculates
//it's winning score based on the hit map and the board it self 
function calcScore(board) {
  let sum = 0;
  for (let i=0; i<hits[board].length; i++) {
    for (let j=0; j<hits[board][i].length; j++) {
      if (hits[board][i][j] === 0) {
        sum += parseInt(boards[board][i][j]);
      }
    }
  }
  return sum;
}

//iterate through all the drawn bingo numbers , updating the hit maps
//for each board when there's a match
function findWinner() {
  for (let i=0; i<numbers.length; i++) {
    for (let j=0; j<boards.length; j++) {
      for (let k=0; k<boards[j].length; k++) {
        for (let l=0; l<boards[j][k].length; l++) {
          if (boards[j][k][l] === numbers[i]) {
            hits[j][k][l] = 1;
            for (let m=0; m<hits.length; m++) {
              for (let n=0; n<hits[m].length; n++) {
                if (hits[m][n].join('') === '11111') {
                  console.log('Winner is board no: ', m);
                  console.log('Winning score is: ', calcScore(m) * numbers[i]);
                  return m;
                }
              }
              for (let o=0; o<hits[m][0].length; o++) {
                if (''.concat(
                  hits[m][0][o],
                  hits[m][1][o],
                  hits[m][2][o],
                  hits[m][3][o],
                  hits[m][4][o]
                  ) === '11111') {
                    console.log('Winner is board no: ', m);
                    console.log('Winning score is: ', calcScore(m) * numbers[i]);
                    return m;
                  }
              }
            }
          }
        }
      }
    }
  }
}

findWinner();

//iterate through all the drawn bingo numbers , updating the hit maps
//for each board when there's a match and removing the winning board from the
//available boards (to find the last winning board)
function findLastWinner() {
  hits = boards.map( (board, i) => {
    return board.map( (el) => {
      return [0,0,0,0,0];
    });
  });
  let boardsLeft = [...Array(boards.length).keys()];
  console.log(boardsLeft);
  for (let i=0; i<numbers.length; i++) {
    for (let j=0; j<boards.length; j++) {
      for (let k=0; k<boards[j].length; k++) {
        for (let l=0; l<boards[j][k].length; l++) {
          if (boards[j][k][l] === numbers[i]) {
            hits[j][k][l] = 1;
            for (let m=0; m<hits.length; m++) {
              for (let n=0; n<hits[m].length; n++) {
                if (hits[m][n].join('') === '11111') {
                  if (boardsLeft.length < 2) {
                    console.log('Last winning board is no: ', m);
                    console.log('Winning score is: ', calcScore(m) * numbers[i]);
                    return m;
                  } else {
                    console.log(boardsLeft.splice(boardsLeft.indexOf(m),1));
                    
                  }
                }
              }
              for (let o=0; o<hits[m][0].length; o++) {
                if (''.concat(
                  hits[m][0][o],
                  hits[m][1][o],
                  hits[m][2][o],
                  hits[m][3][o],
                  hits[m][4][o]
                  ) === '11111') {
                    if (boardsLeft.length < 2) {
                      console.log('Last winning board is no: ', m);
                      console.log('Winning score is: ', calcScore(m) * numbers[i]);
                      return m;
                    } else {
                      boardsLeft.splice(boardsLeft.indexOf(m),1);
                    }
                  }
              }
            }
          }
        }
      }
    }
  }
}

findLastWinner();