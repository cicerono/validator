<a name="0.11.0"></a>
# [0.11.0](https://github.com/relekang/validator/compare/v0.10.1...v0.11.0) (2016-06-16)



<a name="0.10.1"></a>
## [0.10.1](https://github.com/relekang/validator/compare/v0.10.0...v0.10.1) (2016-06-10)


### Bug Fixes

* **numeric:** Remove number conversion problem ([093f134](https://github.com/relekang/validator/commit/093f134))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/relekang/validator/compare/v0.9.2...v0.10.0) (2016-05-27)


### Features

* Add support for validating multiple items ([#24](https://github.com/relekang/validator/issues/24)) ([ac28032](https://github.com/relekang/validator/commit/ac28032))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/relekang/validator/compare/v0.9.1...v0.9.2) (2016-05-25)


### Bug Fixes

* **rules.numeric:** Make field related min/max work with '' ([1d34991](https://github.com/relekang/validator/commit/1d34991))
* Upgrade validator to version 5.2.0 ([782b658](https://github.com/relekang/validator/commit/782b658))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/relekang/validator/compare/v0.9.0...v0.9.1) (2016-05-24)


### Bug Fixes

* Add support for nested datastructures ([4d4e179](https://github.com/relekang/validator/commit/4d4e179))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/relekang/validator/compare/v0.8.1...v0.9.0) (2016-05-23)


### Bug Fixes

* Change rule errors to use object path ([710e122](https://github.com/relekang/validator/commit/710e122))


### Features

* Add field config to result object ([23af4db](https://github.com/relekang/validator/commit/23af4db))


### BREAKING CHANGES

* If you have code that rely on matching the string of
the validation error. You need to replace all with `/` with `.`.



<a name="0.8.1"></a>
## [0.8.1](https://github.com/relekang/validator/compare/v0.8.0...v0.8.1) (2016-05-23)


### Bug Fixes

* Add field name to numeric min/max related to field ([53c3584](https://github.com/relekang/validator/commit/53c3584))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/relekang/validator/compare/v0.7.1...v0.8.0) (2016-05-23)


### Bug Fixes

* **rules.arrayOf:** Make sure it does not evaluate 'values' as a field ([b0985fe](https://github.com/relekang/validator/commit/b0985fe))
* **rules.required:** Validate the number 0 as true ([fe85014](https://github.com/relekang/validator/commit/fe85014)), closes [#21](https://github.com/relekang/validator/issues/21)


### Features

* **rules.numeric:** Add setting max and min based on other field ([ba7b286](https://github.com/relekang/validator/commit/ba7b286))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/relekang/validator/compare/v0.7.0...v0.7.1) (2016-05-23)


### Bug Fixes

* Be more specific to which files are published ([a0f5b80](https://github.com/relekang/validator/commit/a0f5b80))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/relekang/validator/compare/v0.6.0...v0.7.0) (2016-05-23)


### Bug Fixes

* Export all rules ([81dfe88](https://github.com/relekang/validator/commit/81dfe88))


### Features

* Add regex rule ([eed0286](https://github.com/relekang/validator/commit/eed0286))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/relekang/validator/compare/v0.5.0...v0.6.0) (2016-05-22)


### Bug Fixes

* Make the extended rules accessible to the validator ([#18](https://github.com/relekang/validator/issues/18)) ([f0118db](https://github.com/relekang/validator/commit/f0118db))
* Throw UnknownRuleError when rule is not found ([#15](https://github.com/relekang/validator/issues/15)) ([d96113a](https://github.com/relekang/validator/commit/d96113a))


### Features

* **rules.length:** Add support for exact in length ([#20](https://github.com/relekang/validator/issues/20)) ([e1108c5](https://github.com/relekang/validator/commit/e1108c5))
* Add ageByDate validation rule ([01e3d2c](https://github.com/relekang/validator/commit/01e3d2c))
* Add arrayOf rule ([082469f](https://github.com/relekang/validator/commit/082469f))
* Add date rule ([#19](https://github.com/relekang/validator/issues/19)) ([8f945c7](https://github.com/relekang/validator/commit/8f945c7))
* Add length rule ([#17](https://github.com/relekang/validator/issues/17)) ([bce5c4d](https://github.com/relekang/validator/commit/bce5c4d))
* Add support for arrays in required ([75bef39](https://github.com/relekang/validator/commit/75bef39))
* Add support for if statements in rule options ([8759104](https://github.com/relekang/validator/commit/8759104)), closes [#6](https://github.com/relekang/validator/issues/6)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/relekang/validator/compare/v0.4.3...v0.5.0) (2016-05-19)


### Bug Fixes

* Only call isInt, isFloat with strings ([b25d802](https://github.com/relekang/validator/commit/b25d802))
* Return sub rule if the error is related to a sub rule ([#14](https://github.com/relekang/validator/issues/14)) ([5051215](https://github.com/relekang/validator/commit/5051215))


### Features

* Make the errors immutable ([f012d97](https://github.com/relekang/validator/commit/f012d97))


### BREAKING CHANGES

* This will deep freeze all error outputs and thus may
require you to change your code if you mutate the errors.



<a name="0.4.3"></a>
## [0.4.3](https://github.com/relekang/validator/compare/v0.4.2...v0.4.3) (2016-05-19)


### Bug Fixes

* Make numeric support 0 as limits ([0845203](https://github.com/relekang/validator/commit/0845203))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/relekang/validator/compare/v0.4.1...v0.4.2) (2016-01-27)


### Bug Fixes

* Make integerOnly require integer not disallow them ([ca8392d](https://github.com/relekang/validator/commit/ca8392d))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/relekang/validator/compare/v0.4.0...v0.4.1) (2016-01-27)


### Bug Fixes

* Correct typo in readme example ([84b66db](https://github.com/relekang/validator/commit/84b66db))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/relekang/validator/compare/v0.3.0...v0.4.0) (2016-01-26)


### Bug Fixes

* Export module elements correctly ([45ab836](https://github.com/relekang/validator/commit/45ab836))


### Features

* Add subrule to the rule property of the result ([1e9a3f7](https://github.com/relekang/validator/commit/1e9a3f7)), closes [#2](https://github.com/relekang/validator/issues/2)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/relekang/validator/compare/v0.2.0...v0.3.0) (2016-01-26)


### Features

* Add numeric validation rule ([21dbb0d](https://github.com/relekang/validator/commit/21dbb0d))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/relekang/validator/compare/v0.1.2...v0.2.0) (2016-01-25)


### Bug Fixes

* Add lint npm script ([aa6ea93](https://github.com/relekang/validator/commit/aa6ea93))


### Features

* Add state of errors ([7a7efc8](https://github.com/relekang/validator/commit/7a7efc8))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/relekang/validator/compare/v0.1.1...v0.1.2) (2016-01-24)


### Bug Fixes

* Add readme ([ec8a266](https://github.com/relekang/validator/commit/ec8a266))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/relekang/validator/compare/v0.1.0...v0.1.1) (2016-01-24)


### Bug Fixes

* Rename import in index ([7d0a4e3](https://github.com/relekang/validator/commit/7d0a4e3))



