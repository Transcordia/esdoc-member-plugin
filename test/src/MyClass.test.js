const assert = require('assert');
const {find} = require('../util');

describe('test/MyClass.js:', ()=> {
  it('has a read/write property access', ()=>{
    const doc = find('longname', 'src/MyClass.js~MyClass#prop1');
    assert.equal(doc.kind, 'member');
    assert.equal(doc.modality, 'both');
  });

  it('has a readonly property', ()=>{
    const doc = find('longname', 'src/MyClass.js~MyClass#prop2');
    assert.equal(doc.kind, 'member');
    assert.equal(doc.modality, 'readonly');
  });

  it('has a writeonly property', ()=>{
    const doc = find('longname', 'src/MyClass.js~MyClass#prop3');
    assert.equal(doc.kind, 'member');
    assert.equal(doc.modality, 'writeonly');
  });

});

