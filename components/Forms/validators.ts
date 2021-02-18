import levenshtein from 'js-levenshtein'

export function hasNumber(value: string): boolean {
  return /^.*[0-9].*$/.test(value)
}

export function hasUpperCaseLetter(value: string): boolean {
  return /^.*[A-Z].*$/.test(value)
}

export function hasLowerCaseLetter(value: string): boolean {
  return /^.*[a-z].*$/.test(value)
}

export function hasSpecialSymbol(value: string): boolean {
  return /^.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~].*$/.test(value)
}

export function stringsDifference(original: string, difference = 0) {
  return (value: string): boolean => levenshtein(value, original) >= difference
}
