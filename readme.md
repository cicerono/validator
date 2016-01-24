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
