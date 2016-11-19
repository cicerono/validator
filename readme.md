# Validator

A form validator that takes a JSON based configuration.

## Install

```
npm i --save cicero-form-validator
```

## Usage

```es6
import validator, {multipleValidator} from 'cicero-form-validator'

const validate = validator({
  field: { required: true }
})

validate(['field'], {})
// => { field: { field: 'field', rule: 'required', value: undefined } }


const validateMultiple = multipleValidator({
  field: { required: true }
})


const validateMultiple = multipleValidator({ field: { required: true } })

validateMultiple(['field'], { 1: {} })
// => { 1: { field: { field: 'field', rule: 'required', value: undefined } } }
```

### Configuration

#### Options that work for all rules
##### `if`
Should be a function which returns a boolean. It will be called with
an object containing all the fields as a first argument.

The example below will make field required if otherField is filled with `"100"`.

```es6
{
  field: {
    required: { if: (fields) => fields.otherField === "100" }
  }
}

```

### Adding new rules

```es6
import {extend} from 'cicero-form-validator'

const {validator, multipleValidator} = extend({
  mod: (field, value, options) => value % options.constant === 0 ? null : 'mod'
});

validator({ f: { mod: { constant: 2 } })(['f'], { f: 3 })
// => { f: { field: 'f', rule: 'mod', value: 3 } }

multipleValidator({ f: { mod: { constant: 2 } } })(['f'], { 1: { f: 3 } })
// => { '1': { f: { field: 'f', rule: 'mod', value: 3, config: [Object] } } }
```

### Creating rules

A rule is a function that takes three arguments: field, value and options.
It then validates the value based on a given conditions and
returns `null` if the value validates. If not it should return the name of the
rule that did not validate. A rule can have sub-rules (e.g. numeric validation with max value).
It should then return `'rule/sub-rule'` if the data does not validate.
