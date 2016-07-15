# Validator

## Install

```
npm i --save @relekang/validator
```

## Usage

```javascript
var Validator = require('@relekang/validator')

var validator = Validator({
  field: { required: true }
})

validator.validate(['field'], {})
// => { field: { field: 'field', rule: 'required', value: undefined } }
```

### Adding new rules

```javascript
var validatorCreator = require("@relekang/validator").extend;

var Validator = validatorCreator({
  mod: (field, value, options) => value % options.constant === 0 ? null : 'mod'
});

Validator({ f: { mod: { constant: 2 } }).validate(['f'], { f: 3 })
// => { f: { field: 'f', rule: 'mod', value: 3 } }
```

### Creating rules

A rule is a function that takes three arguments: field, value and options. It then validates the value based on a given conditions and
returns `null` if the value validates. If not it should return the name of the
rule that did not validate. A rule can have sub-rules (e.g. numeric validation with max value). It should then return `'rule/sub-rule'` if the data does not validate.

## How to run tests on your PC
JavaScript test runner used in this project is called `Ava`. So first think, you need to do is to install Ava module

```javascript
npm install --global ava
// => will install the module globally, so you are able to use it with command "ava..."
```

For running test cases in the project you can write
```javascript
ava             - runs all test cases
ava test.js     - runs all tests included in the specified file
ava test-*.js   - runs all tests included in files with matching file name 
```

For more info: https://github.com/avajs/ava
