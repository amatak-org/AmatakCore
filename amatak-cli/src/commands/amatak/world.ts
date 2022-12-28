import {Command} from '@oclif/core'

export default class amatak extends Command {
  static description = 'Amatak Serve'

  static flags = {}

  static args = []

  async run(): Promise<void> {
    this.log('amatak (./src/commands/amatak/world.ts)')
  }
}
