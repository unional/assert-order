import { BaseError } from 'make-error'

export class NotRejected<T extends any> extends BaseError {
  // istanbul ignore next
  constructor(public value: T) {
    super(`Expected promise to be rejected, but it was resolved instead '${value}'`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}