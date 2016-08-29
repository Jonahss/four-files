let random = require('random-number');
let fs = require('fs');

let newline = function() {
  let num = random({min: 0, max: 1000000, integer: true});
  return `num: ${num}\n`;
};

let createFile = function(filename, numLines) {
  let stream = fs.createWriteStream(`./assets/${filename}.txt`);
  stream.on('open', () => {
    for (var i of Array(numLines)) {
      stream.write(newline());
      console.log(i);
    }
  });
};

createFile('file0', 10);
createFile('file1', 100);
createFile('file2', 1000);
createFile('file3', 10000);
