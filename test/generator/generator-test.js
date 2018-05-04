/*
 * Generator tests
 */

const fs = require('fs');
const assert = require('assert');
const parse = require('../../syntax/parser');
require('../../backend/javascript-generator');

const DIR = './test/generator';

describe('The generator', () => {
  fs.readdirSync(DIR).forEach((name) => {
    if (name.endsWith('.lul')) {
      it(`verifies direct output of ${name}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        program.analyze();
        const expectedOutput = eval(program.gen());
        assert.deepEqual(`${expectedOutput}`, fs.readFileSync(`${__dirname}/${name}.txt`, 'utf-8'));
        assert.deepEqual();
        done();
      });
    }
  });
});
