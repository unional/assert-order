import { BaseError } from 'make-error'
import { SatisfierExec } from 'satisfier'
import { tersify } from 'tersify'

export class NotSatisfied extends BaseError {
  // istanbul ignore next
  constructor(public entries: SatisfierExec[]) {
    super(format(entries).join('\n'))
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

function format(entries: SatisfierExec[]) {
  return entries.map(e => {
    const path = formatPath(e.path)
    return `Expect ${path} to satisfy ${formatValue(e.expected)}, but received ${formatValue(e.actual)}`
  })
}

function formatPath(entries: string[]) {
  if (entries.length === 0)
    return 'actual'
  const nodes = [...entries]
  if (isIndice(nodes[0])) {
    nodes.unshift('actual')
  }
  return nodes.map(n => isIndice(n) ? n : '.' + n).join('').slice(1)
}

function isIndice(node: string) {
  return /\[\d*\]/.test(node)
}

function formatValue(value) {
  return typeof value === 'string' ? `'${tersify(value)}'` : tersify(value)
}