
export class AssertOrder {
  private static fnMap = {
    step: 'once',
    any: 'some'
  }
  private possibleSteps: { [index: string]: number[] }
  private planCounter = 0
  private targetCount: number | undefined
  constructor(initStep = 0) {
    this.possibleSteps = {
      once: [initStep],
      some: [initStep],
      all: [initStep]
    }
  }

  step(step: number) {
    this.validate('step', step, 1, {
      once: [step + 1],
      some: [step + 1],
      all: [step + 1]
    })
  }

  any(step: number) {
    this.validate('any', step, undefined, {
      once: [step + 1],
      some: [step, step + 1],
      all: [step + 1]
    })
  }

  some(step: number) {
    this.validate('some', step, undefined, {
      once: [step + 1],
      some: [step, step + 1],
      all: [step + 1]
    })
  }

  all(step: number, plan: number) {
    this.validate('all', step, plan, {
      all: [step]
    })
  }

  /**
   * Assert the specified step will run once.
   */
  once(step: number) {
    this.validate('once', step, 1, {
      once: [step + 1],
      some: [step + 1],
      all: [step + 1]
    })
  }

  private validate(fnName: string, step: number, count: number | undefined, steps) {
    // console.log(step, count, steps, this.possibleSteps)
    const id = AssertOrder.fnMap[fnName] || fnName
    if (this.possibleSteps[id] && this.possibleSteps[id].indexOf(step) !== -1) {
      if (count === undefined) {
        this.possibleSteps = steps
      }
      else if (count <= 0) {
        throw new Error(`${count} is not a valid 'plan' value.`)
      }
      else {
        if (this.targetCount === undefined) {
          this.targetCount = count
        }
        else if (count !== this.targetCount) {
          throw new Error(`The plan count (${count}) does not match with previous value (${this.targetCount}).`)
        }

        // console.log(this.planCounter, count)
        if (++this.planCounter === count) {
          // counter reached. Resetting
          this.planCounter = 0
          this.targetCount = undefined
          this.possibleSteps = {
            once: [step + 1],
            some: [step + 1],
            all: [step + 1]
          }
        }
        else {
          this.possibleSteps = steps
        }
      }
    }
    else {
      throw new Error(this.getErrorMessage(fnName, step))
    }
  }

  private getErrorMessage(calledFn: string, calledStep: number) {
    const should: string[] = []
    for (let key in this.possibleSteps) {
      should.push(`'${key}(${this.possibleSteps[key]})'`)
    }

    return `Expecting ${should.join(', ')}, but received '${calledFn}(${calledStep})'`
  }
}