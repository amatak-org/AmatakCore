export {run} from '@oclif/core'
import {Hook} from '@oclif/core'

const hook: Hook<'init'> = async function (options) {
  console.log(`amatak start ${options.id}`)
}
export default hook
