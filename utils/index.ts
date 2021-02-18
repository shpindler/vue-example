interface Transformable {
  [key: string]: any;
}

/** Преобразует ключи. */
export function transformKeys(
  transformer: (key: string) => string,
  data: Transformable,
): Transformable {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key]
      if (typeof data[key] === 'object') {
        value = transformKeys(transformer, value)
      } else if (Array.isArray(data[key])) {
        value = value.map((item: Transformable) => {
          return transformKeys(transformer, item)
        })
      }
      const newKey = transformer(key)
      if (newKey !== key) {
        data[transformer(key)] = value
        delete data[key]
      }
    }
  }

  return data
}

export function getCookie(name: string): string {
  let cookieValue = ''
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export function convertToFormData(obj: Transformable): FormData {
  const formData = new FormData()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formData.append(key, obj[key])
    }
  }
  return formData
}

export function sliceStartSlash(str: string): string {
  if (str[0] === '/') {
    return str.slice(1, str.length)
  }
  return str
}

export function sliceEndSlash(str: string): string {
  if (str[str.length - 1] === '/') {
    return str.slice(0, str.length - 1)
  }
  return str
}

export function decline(
  variants: [string, string, string],
  count: number,
): string {
  if (count % 10 === 1) {
    return variants[0]
  } else if (count <= 4 && count >= 2) {
    return variants[1]
  }
  return variants[2]
}

export function formatDates(data: Transformable): Transformable {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (data[key] instanceof Date) {
        const [day, month, year] = data[key].toLocaleDateString('ru').split('.')
        data[key] = `${year}-${month}-${day}`
      }
    }
  }
  return data
}

export function removeUndefined(data: Transformable): Transformable {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (data[key] === undefined) {
        delete data[key]
      }
    }
  }
  return data
}

export function formatDate(value: Date): string {
  return value.toLocaleDateString('ru')
}
