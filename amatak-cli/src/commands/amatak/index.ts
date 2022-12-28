import {Command, Flags} from '@oclif/core'

export default class amatak extends Command {
  static description = 'Amatak Cloud'

  static flags = {
    from: Flags.string({char: 'f', description: 'amatak cli', required: true}),
  }

  static args = [{name: 'person', description: 'Person to say hello to', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(amatak)

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/amatak/index.ts)`)
  }
}
