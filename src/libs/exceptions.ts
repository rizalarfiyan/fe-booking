class ErrorAuthorization extends Error {
  constructor(message = 'Unauthorized', code = 401) {
    const messages = message ? `${code}: ${message}` : `${code}`
    super(messages)
    this.message = messages
  }

  toString() {
    return this.message
  }
}

class ErrorValidation extends Error {
  protected data: object

  constructor(message = 'Validation Error', data: object = {}, code = 400) {
    const messages = message ? `${code}: ${message}` : `${code}`
    super(messages)
    this.message = messages
    this.data = data
  }

  toString() {
    return this.message
  }

  getData() {
    return this.data
  }
}

export { ErrorAuthorization, ErrorValidation }
