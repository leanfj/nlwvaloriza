interface IErrorHandler {
  errorStatus: number,
  errorMessage: string
}
class ErroHandler {
  errorStatus: number
  errorMessage: string
  
  constructor ({errorStatus, errorMessage}: IErrorHandler) {
    this.errorStatus = errorStatus
    this.errorMessage = errorMessage
    
  }
}

export {ErroHandler}