const fs = require('fs');
const ESDoc = require('esdoc/out/src/ESDoc').default;
const config = require('./esdoc.json')

function run() {
  ESDoc.generate(config)
  global.docs = JSON.parse(fs.readFileSync('./test/out/index.json').toString());
}

run();
