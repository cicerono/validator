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
  mod: (field, value, options) => value % 2 === 0 ? null : 'mod'
});

Validator({ f: { mod: { constant: 2 } }).validate(['f'], { f: 3 })
// => { f: { field: 'f', rule: 'mod', value: 3 } }
```
