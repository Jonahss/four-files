// transpile:mocha

import fourFiles from '../..';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
console.log(fourFiles);
chai.should();
chai.use(chaiAsPromised);

describe('sample', () => {
  it('should-work',async () => {
    await fourFiles();
  });
});
