import {default as fourFiles} from './lib/four-files';

let path = require('path');

let run = async function() {
  let fileNames = [
    './assets/file0.txt',
    './assets/file1.txt',
    './assets/file2.txt',
    './assets/file3.txt',
  ].map((filepath) => {
    return path.resolve(filepath);
  });
  return await fourFiles(fileNames);
};

if (require.main === module) {
  console.log('running');
  run().then(function(result) {
    console.log('result is', result);
  });
}

export default run;
