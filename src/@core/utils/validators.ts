import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value))
    return 'هذا الحقل مطلوب'

  return !!String(value).trim().length || 'هذا الحقل مطلوب'
}

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'يجب ان يكون الحقل بريد الكتروني صالح'

  return re.test(String(value)) || 'يجب ان يكون الحقل بريد الكتروني صالح'
}

// 👉 Password Validatoral
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/

  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    'يجب ان يحتوي الحقل على حرف كبير وحرف صغير ورمز خاص ورقم واحد على الاقل ويجب ان يكون طول الحقل 8 احرف على الاقل'
  )
}
export const phoneNumValidator = (phoneNum: string) => {
  const regExp = /((009647)|(\+9647)|(07)|(7))((9)|(8)|(7)|(5))[0-9]{8}/

  const validPhoneNum = regExp.test(phoneNum)

  return (
    // eslint-disable-next-line operator-linebreak
    validPhoneNum ||
    'يجب ان يحتوي الحقل على رقم هاتف صحيح ويجب ان يبدأ بـ 07 او 7 او 009647 او +9647'
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>

  value === target || 'يجب ان يكون الحقل متطابق مع حقل كلمة المرور'

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
  const valueAsNumber = Number(value.length)

  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `يجب ان يكون الحقل بين  ${min} و ${max}`
}

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'يجب ان يكون الحقل رقم فقط '

  return /^-?[0-9]+$/.test(String(value)) || 'يجب ان يكون الحقل رقم فقط '
}

// 👉 Regex Validator
export const regexValidator = (value: unknown, regex: RegExp | string): string | boolean => {
  if (isEmpty(value))
    return true

  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)

  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))

  return regeX.test(String(value)) || 'يجب ان يكون الحقل صالح'
}

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  return /^[A-Z]*$/i.test(String(value)) || 'يجب ان يكون الحقل حروف فقط'
}

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(String(value)) || 'يجب ان يكون الحقل رابط صالح'
}

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value))
    return true

  return String(value).length === length || `يجب ان يكون الحقل ${length} حروف`
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'يجب ان يكون الحقل حروف او ارقام او شرطة او شرطة سفلية فقط'
}

// date greater than or equal to
export const dateGTEValidator = (value: unknown, target: unknown, message?: string) => {
  if (isEmpty(value))
    return true

  const valueAsDate = new Date(value)
  const targetAsDate = new Date(target)

  return valueAsDate >= targetAsDate || ((message ?? 'يجب ان يكون الحقل اكبر من او يساوي الحقل المقارن'))
}

// date less than or equal to
export const dateLTEValidator = (value: unknown, target: unknown, message?: string) => {
  if (isEmpty(value))
    return true

  const valueAsDate = new Date(value)
  const targetAsDate = new Date(target)

  return valueAsDate <= targetAsDate || (message ?? 'يجب ان يكون الحقل اصغر من او يساوي الحقل المقارن')
}
