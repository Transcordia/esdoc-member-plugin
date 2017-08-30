# ESDoc Member Plugin

Several people had requested that class getters and setters be documented as member properties. I wanted
this result as well, and wrote a plugin to achieve it.

ESDoc is a nice framework, but it lacks in the templating area. In order to indicate that a property is readonly or 
writeonly, it seems that I will have to completely fork the `esdoc-publish-html-plugin` in order to
make this small change to the generated output. This isn't a viable approach since some other author would have to 
do the same thing to make her change to the published output, thereby ignoring my own. 

Because of this, if you want to indicate that your property is readonly or writeonly, you will have to add that 
fact to your description.



## Install
```bash
npm install esdoc-member-plugin
```

## Config
```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {"name": "esdoc-member-plugin"}
  ]
}
```

## Usage

```js
export default class MyClass {

  /**
   * This is the readable comment
   */
  get prop1() {
  }

  /**
   * This is the writeable comment
   *
   * @param value
   */
  set prop1( value ) {}

  /**
   * This is a read-only member property
   * @type {string}
   */
  get prop2() {}

  /**
   * This is a write-only member property
   */
  set prop3( value ) {}
}
```

## LICENSE
MIT

## Author
[oravecz](https://github.com/oravecz)
