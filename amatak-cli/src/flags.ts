// src/flags.ts
import {Flags} from '@oclif/core'

class Team {
  public name: string;
  // etc...
}

function getTeam(): Promise<Team> {
  // imagine this reads a configuration file or something to find the team
  return new Team()
}

export const team = Flags.custom<Team>({
  char: 't',
  description: 'team to use',
  default: () => getTeam(),
})

// src/commands/mycommand.ts
import {team} from '../flags'
import {Command} from '@oclif/core'

export class amatak extends Command {
  static flags = {
    team: team(),
  }

  async run() {
    const {flags} = await this.parse(amatak)
    if (flags.team) console.log(`--team is ${flags.team.name}`)
  }
}
