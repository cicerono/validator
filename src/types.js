// @flow
/* eslint-disable no-use-before-define */
export type ValidatorError = {|
   field: string,
   rule: string,
   value: mixed,
   config: {[key: string]: mixed},
|}

export type ValidatorErrors = { [field: string]: ValidatorError }

export type IfCheck =
  | boolean
  | (fields: {[key: string]: mixed}) => boolean

export type RuleConfig = boolean | {
  if?: IfCheck,
  [key: string]: mixed,
}

export type RequiredConfig = boolean | { if: IfCheck }

export type LengthConfig = {|
  if?: IfCheck,
  min?: number,
  max?: number,
  exact?: number,
|}

export type AgeByDateConfig = {|
  if?: IfCheck,
  min?: number,
  max?: number,
  exact?: number,
|}

export type ArrayOfConfig = {
  if?: IfCheck,
  [field: string]: FieldConfig,
}

export type NumericConfig = {|
  if?: IfCheck,
  delimiter?: string,
  integerOnly?: boolean,
  min?: number | {field: string},
  max?: number | {field: string},
|}

export type RegexpConfig = {|
  if?: IfCheck,
  pattern: string | RegExp,
|}

export type DateConfig = {|
  if?: IfCheck,
  format: string,
  past?: boolean,
  future?: boolean,
  min?: string,
  max?: string,
|}

export type FieldConfig = {
  ageByDate?: AgeByDateConfig,
  arrayOf?: ArrayOfConfig,
  date?: DateConfig,
  length?: LengthConfig,
  numeric?: NumericConfig,
  regex?: RegexpConfig,
  required?: RequiredConfig,
  [rule: string]: RuleConfig,
}

export type ValidatorConfig = {
  [field: string]: FieldConfig,
}

export type RuleOptions = { [key: string]: any };
export type RuleSet = {[key: string]: ValidatorRule};

export type ValidatorRule = (
  field: string,
  value: any,
  options: RuleOptions
) => ?string | Array<ValidatorErrors>;

export type ValidateFunction = (fields: Array<string>, data: Object) => ValidatorErrors;
export type Validator = (config: ValidatorConfig) => ValidateFunction;
