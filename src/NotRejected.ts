export class NotRejected<T extends any> extends Error {
  constructor(public value: T) {
    super(`Expected promise to be rejected, but it was resolved instead '${value}'`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
