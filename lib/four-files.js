let fs = require('fs');
let split = require('split');
let through = require('through2');

let parseLine = through.obj(function(chunk, enc, callback) {

  if (!chunk.length) {
    return callback();
  }

  let num = /num: (.*)/.exec(chunk)[1];

  this.push(num);
  callback();
});

let minNum = function(filename) {

  let min = null;

  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(filename)
               .pipe(split())
               .pipe(parseLine);

    stream.on('data', function(data) {
      if (min === null) {
        min = data;
      } else {
        min = Math.min(min, data);
      }
    });

    stream.on('end', function() {
      resolve(min);
    });
    stream.on('error', reject);
  });
};

async function func(fileNames) {

  let minimums = fileNames.map((filename) => {
    return minNum(filename);
  });

  minimums = await Promise.all(minimums);

  minimums = minimums.map((num, index) => {
    return {
      file: fileNames[index],
      minimum: num
    };
  });

  return minimums.reduce(function(a,b) {
    return a.minimum < b.minimum ? a : b;
  });
}

export default func;
