import Command from '@heroku-cli/command'

export class Whoami extends Command {
  async run() {
    try {
      let {body: account} = await this.heroku.get('/account')
      this.log(account.email)
    } catch (err) {
      if (err.statusCode === 401) {
        this.error('not logged in', {exit: 100})
      }
      throw err
    }
  }
}
