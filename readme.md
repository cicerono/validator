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

### Configuration

#### Options that work for all rules
##### `if`
Should be a function which returns a boolean. It will be called with
an object containing all the fields as a first argument.

The example below will make field required if otherField is filled with `"100"`.

```js
{
  field: {
    required: { if: (fields) => fields.otherField === "100" }
  }
}

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
