class apiError extends Error {
  constructor(status, message) {
    super();
    // this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new apiError(message);
  }
  static internal(message) {
    return new apiError(message);
  }
  static forbidden(message) {
    return new apiError(message);
  }
}

export default apiError;
