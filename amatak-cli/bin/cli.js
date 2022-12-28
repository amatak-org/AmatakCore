import {Command} from '@oclif/core'
export class amatak extends Command {
  public static enableJsonFlag = true
  public async run(): Promise<{ message: string }> {
    console.log('amatak')
    return { message: 'Amatak Serve' }
  }
}
