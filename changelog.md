<a name="1.1.1"></a>
## [1.1.1](https://github.com/cicerono/validator/compare/v1.1.0...v1.1.1) (2017-08-09)


### Bug Fixes

* Remove unecessary dependencies ([ba32486](https://github.com/cicerono/validator/commit/ba32486))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/cicerono/validator/compare/v1.0.2...v1.1.0) (2017-05-08)


### Features

* **date:** Add support for related min/max fields ([e59815b](https://github.com/cicerono/validator/commit/e59815b))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/cicerono/validator/compare/v1.0.1...v1.0.2) (2017-04-18)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/cicerono/validator/compare/v1.0.0...v1.0.1) (2017-02-23)


### Bug Fixes

* Firefox regex issue ([5870892](https://github.com/cicerono/validator/commit/5870892))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/cicerono/validator/compare/v1.0.0-rc.6...v1.0.0) (2017-02-09)



<a name="1.0.0-rc.6"></a>
# [1.0.0-rc.6](https://github.com/cicerono/validator/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2017-02-03)


### Features

* extend duration rule ([384d5a4](https://github.com/cicerono/validator/commit/384d5a4))



<a name="1.0.0-rc.5"></a>
# [1.0.0-rc.5](https://github.com/cicerono/validator/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2017-02-03)


### Features

* add flow annotation ([85735e2](https://github.com/cicerono/validator/commit/85735e2))
* add flow checking ([b92d427](https://github.com/cicerono/validator/commit/b92d427))
* create rule for duration ([97461b0](https://github.com/cicerono/validator/commit/97461b0))



<a name="1.0.0-rc.4"></a>
# [1.0.0-rc.4](https://github.com/cicerono/validator/compare/v1.0.0-rc.3...v1.0.0-rc.4) (2016-11-22)


### Bug Fixes

* Make arrayOf return null when there are no errors ([031a27d](https://github.com/cicerono/validator/commit/031a27d))



<a name="1.0.0-rc.3"></a>
# [1.0.0-rc.3](https://github.com/cicerono/validator/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2016-11-21)


### Bug Fixes

* Add missing function getNumberOfDecimalPlaces after cherry-pick ([ccc9ea3](https://github.com/cicerono/validator/commit/ccc9ea3))



<a name="1.0.0-rc.2"></a>
# [1.0.0-rc.2](https://github.com/cicerono/validator/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2016-11-21)


### Bug Fixes

* Assign config as a property to validator functions ([37a266e](https://github.com/cicerono/validator/commit/37a266e))
* Make arrayOf use extended validator ([5425e25](https://github.com/cicerono/validator/commit/5425e25))


### Features

* Add bundling of flowtypes ([9ed5bf6](https://github.com/cicerono/validator/commit/9ed5bf6))



<a name="1.0.0-rc.1"></a>
# [1.0.0-rc.1](https://github.com/cicerono/validator/compare/v0.18.0...v1.0.0-rc.1) (2016-11-02)


### Features

* Add memoized version of validators ([d4b9dd1](https://github.com/cicerono/validator/commit/d4b9dd1))
* Export multipleValidator ([8d81089](https://github.com/cicerono/validator/commit/8d81089))
* Make validator stateless ([eb45e7e](https://github.com/cicerono/validator/commit/eb45e7e))


### BREAKING CHANGES

* This rewrites the validator away from the class based to a functional
one relying on currying. The exported validator function will return a
validate function.



<a name="0.18.0"></a>
# [0.18.0](https://github.com/cicerono/validator/compare/v0.17.0...v0.18.0) (2016-10-20)


### Features

* uniqueInArray validator ([#55](https://github.com/cicerono/validator/issues/55)) ([a3470e4](https://github.com/cicerono/validator/commit/a3470e4))



<a name="0.17.0"></a>
# [0.17.0](https://github.com/cicerono/validator/compare/v0.16.0...v0.17.0) (2016-10-12)


### Bug Fixes

* require should accept spaces as valid ([#52](https://github.com/cicerono/validator/issues/52)) ([b00d608](https://github.com/cicerono/validator/commit/b00d608))


### BREAKING CHANGES

* This will make values with spaces end up in other validation rules.



<a name="0.16.0"></a>
# [0.16.0](https://github.com/cicerono/validator/compare/v0.15.0...v0.16.0) (2016-09-26)


### Bug Fixes

* Export correct value for list of rules ([fe0a965](https://github.com/cicerono/validator/commit/fe0a965))


### Features

* Add new rule sumArray ([#51](https://github.com/cicerono/validator/issues/51)) ([eec4db4](https://github.com/cicerono/validator/commit/eec4db4)), closes [#28](https://github.com/cicerono/validator/issues/28)



<a name="0.15.0"></a>
# [0.15.0](https://github.com/cicerono/validator/compare/v0.14.3...v0.15.0) (2016-08-17)


### Features

* flatten arrayOf validation output ([#49](https://github.com/cicerono/validator/issues/49)) ([f0074ec](https://github.com/cicerono/validator/commit/f0074ec)), closes [#49](https://github.com/cicerono/validator/issues/49)



<a name="0.14.3"></a>
## [0.14.3](https://github.com/cicerono/validator/compare/v0.14.2...v0.14.3) (2016-08-15)


### Bug Fixes

* add support of boolean value in "required" validator ([#47](https://github.com/cicerono/validator/issues/47)) ([3ed9f14](https://github.com/cicerono/validator/commit/3ed9f14))



<a name="0.14.2"></a>
## [0.14.2](https://github.com/cicerono/validator/compare/v0.14.1...v0.14.2) (2016-08-04)


### Bug Fixes

* reset errors between calls to validate ([#45](https://github.com/cicerono/validator/issues/45)) ([057be15](https://github.com/cicerono/validator/commit/057be15))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/cicerono/validator/compare/v0.14.0...v0.14.1) (2016-07-28)


### Bug Fixes

* Add fallback to iso format for date validator ([d13caa5](https://github.com/cicerono/validator/commit/d13caa5))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/cicerono/validator/compare/v0.13.0...v0.14.0) (2016-07-19)


### Bug Fixes

* Remove rounding of min/max limit value ([b9a28a7](https://github.com/cicerono/validator/commit/b9a28a7))
* Make exact violations return lenght.exact ([3f328c2](https://github.com/cicerono/validator/commit/3f328c2))


<a name="0.13.0"></a>
# [0.13.0](https://github.com/cicerono/validator/compare/v0.12.0...v0.13.0) (2016-07-05)


### Bug Fixes

* Make regex rule actually use the pattern ([98f4d7a](https://github.com/cicerono/validator/commit/98f4d7a))
* Only run other rules when required validates ([#32](https://github.com/cicerono/validator/issues/32)) ([69e92aa](https://github.com/cicerono/validator/commit/69e92aa))


### BREAKING CHANGES

* This will result in rules not being run with empty
values so if there are rules that depends on empty values they would not
work any longer.

* fix: Remove empty value checks from rules

* fix: Alter check for if statements so it works for rules and required

* refactor: Move fetching of config for rule to a function



<a name="0.12.0"></a>
# [0.12.0](https://github.com/cicerono/validator/compare/v0.11.2...v0.12.0) (2016-06-23)



<a name="0.11.2"></a>
## [0.11.2](https://github.com/cicerono/validator/compare/v0.11.1...v0.11.2) (2016-06-22)


### Bug Fixes

* Support empty values in date rule ([b82096e](https://github.com/cicerono/validator/commit/b82096e))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/cicerono/validator/compare/v0.11.0...v0.11.1) (2016-06-22)


### Bug Fixes

* Make length validator accept empty string ([248ad18](https://github.com/cicerono/validator/commit/248ad18))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/cicerono/validator/compare/v0.10.1...v0.11.0) (2016-06-16)



<a name="0.10.1"></a>
## [0.10.1](https://github.com/cicerono/validator/compare/v0.10.0...v0.10.1) (2016-06-10)


### Bug Fixes

* **numeric:** Remove number conversion problem ([093f134](https://github.com/cicerono/validator/commit/093f134))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/cicerono/validator/compare/v0.9.2...v0.10.0) (2016-05-27)


### Features

* Add support for validating multiple items ([#24](https://github.com/cicerono/validator/issues/24)) ([ac28032](https://github.com/cicerono/validator/commit/ac28032))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/cicerono/validator/compare/v0.9.1...v0.9.2) (2016-05-25)


### Bug Fixes

* **rules.numeric:** Make field related min/max work with '' ([1d34991](https://github.com/cicerono/validator/commit/1d34991))
* Upgrade validator to version 5.2.0 ([782b658](https://github.com/cicerono/validator/commit/782b658))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/cicerono/validator/compare/v0.9.0...v0.9.1) (2016-05-24)


### Bug Fixes

* Add support for nested datastructures ([4d4e179](https://github.com/cicerono/validator/commit/4d4e179))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/cicerono/validator/compare/v0.8.1...v0.9.0) (2016-05-23)


### Bug Fixes

* Change rule errors to use object path ([710e122](https://github.com/cicerono/validator/commit/710e122))


### Features

* Add field config to result object ([23af4db](https://github.com/cicerono/validator/commit/23af4db))


### BREAKING CHANGES

* If you have code that rely on matching the string of
the validation error. You need to replace all with `/` with `.`.



<a name="0.8.1"></a>
## [0.8.1](https://github.com/cicerono/validator/compare/v0.8.0...v0.8.1) (2016-05-23)


### Bug Fixes

* Add field name to numeric min/max related to field ([53c3584](https://github.com/cicerono/validator/commit/53c3584))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/cicerono/validator/compare/v0.7.1...v0.8.0) (2016-05-23)


### Bug Fixes

* **rules.arrayOf:** Make sure it does not evaluate 'values' as a field ([b0985fe](https://github.com/cicerono/validator/commit/b0985fe))
* **rules.required:** Validate the number 0 as true ([fe85014](https://github.com/cicerono/validator/commit/fe85014)), closes [#21](https://github.com/cicerono/validator/issues/21)


### Features

* **rules.numeric:** Add setting max and min based on other field ([ba7b286](https://github.com/cicerono/validator/commit/ba7b286))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/cicerono/validator/compare/v0.7.0...v0.7.1) (2016-05-23)


### Bug Fixes

* Be more specific to which files are published ([a0f5b80](https://github.com/cicerono/validator/commit/a0f5b80))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/cicerono/validator/compare/v0.6.0...v0.7.0) (2016-05-23)


### Bug Fixes

* Export all rules ([81dfe88](https://github.com/cicerono/validator/commit/81dfe88))


### Features

* Add regex rule ([eed0286](https://github.com/cicerono/validator/commit/eed0286))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/cicerono/validator/compare/v0.5.0...v0.6.0) (2016-05-22)


### Bug Fixes

* Make the extended rules accessible to the validator ([#18](https://github.com/cicerono/validator/issues/18)) ([f0118db](https://github.com/cicerono/validator/commit/f0118db))
* Throw UnknownRuleError when rule is not found ([#15](https://github.com/cicerono/validator/issues/15)) ([d96113a](https://github.com/cicerono/validator/commit/d96113a))


### Features

* **rules.length:** Add support for exact in length ([#20](https://github.com/cicerono/validator/issues/20)) ([e1108c5](https://github.com/cicerono/validator/commit/e1108c5))
* Add ageByDate validation rule ([01e3d2c](https://github.com/cicerono/validator/commit/01e3d2c))
* Add arrayOf rule ([082469f](https://github.com/cicerono/validator/commit/082469f))
* Add date rule ([#19](https://github.com/cicerono/validator/issues/19)) ([8f945c7](https://github.com/cicerono/validator/commit/8f945c7))
* Add length rule ([#17](https://github.com/cicerono/validator/issues/17)) ([bce5c4d](https://github.com/cicerono/validator/commit/bce5c4d))
* Add support for arrays in required ([75bef39](https://github.com/cicerono/validator/commit/75bef39))
* Add support for if statements in rule options ([8759104](https://github.com/cicerono/validator/commit/8759104)), closes [#6](https://github.com/cicerono/validator/issues/6)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/cicerono/validator/compare/v0.4.3...v0.5.0) (2016-05-19)


### Bug Fixes

* Only call isInt, isFloat with strings ([b25d802](https://github.com/cicerono/validator/commit/b25d802))
* Return sub rule if the error is related to a sub rule ([#14](https://github.com/cicerono/validator/issues/14)) ([5051215](https://github.com/cicerono/validator/commit/5051215))


### Features

* Make the errors immutable ([f012d97](https://github.com/cicerono/validator/commit/f012d97))


### BREAKING CHANGES

* This will deep freeze all error outputs and thus may
require you to change your code if you mutate the errors.



<a name="0.4.3"></a>
## [0.4.3](https://github.com/cicerono/validator/compare/v0.4.2...v0.4.3) (2016-05-19)


### Bug Fixes

* Make numeric support 0 as limits ([0845203](https://github.com/cicerono/validator/commit/0845203))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/cicerono/validator/compare/v0.4.1...v0.4.2) (2016-01-27)


### Bug Fixes

* Make integerOnly require integer not disallow them ([ca8392d](https://github.com/cicerono/validator/commit/ca8392d))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/cicerono/validator/compare/v0.4.0...v0.4.1) (2016-01-27)


### Bug Fixes

* Correct typo in readme example ([84b66db](https://github.com/cicerono/validator/commit/84b66db))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/cicerono/validator/compare/v0.3.0...v0.4.0) (2016-01-26)


### Bug Fixes

* Export module elements correctly ([45ab836](https://github.com/cicerono/validator/commit/45ab836))


### Features

* Add subrule to the rule property of the result ([1e9a3f7](https://github.com/cicerono/validator/commit/1e9a3f7)), closes [#2](https://github.com/cicerono/validator/issues/2)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/cicerono/validator/compare/v0.2.0...v0.3.0) (2016-01-26)


### Features

* Add numeric validation rule ([21dbb0d](https://github.com/cicerono/validator/commit/21dbb0d))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/cicerono/validator/compare/v0.1.2...v0.2.0) (2016-01-25)


### Bug Fixes

* Add lint npm script ([aa6ea93](https://github.com/cicerono/validator/commit/aa6ea93))


### Features

* Add state of errors ([7a7efc8](https://github.com/cicerono/validator/commit/7a7efc8))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/cicerono/validator/compare/v0.1.1...v0.1.2) (2016-01-24)


### Bug Fixes

* Add readme ([ec8a266](https://github.com/cicerono/validator/commit/ec8a266))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/cicerono/validator/compare/v0.1.0...v0.1.1) (2016-01-24)


### Bug Fixes

* Rename import in index ([7d0a4e3](https://github.com/cicerono/validator/commit/7d0a4e3))
