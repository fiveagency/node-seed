export class ReminderAlreadySentForCurrentHourError extends Error {
  constructor(detail, code) {
    super(detail);
    this.code = code;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }
}
