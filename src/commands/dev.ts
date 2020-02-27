import { Command } from '@oclif/command'
import spawn from 'cross-spawn'
import { join, resolve } from 'path'

import { getCommand } from '../utils/getCommand'
import { appPath } from '../utils/paths'
import { cleanJsFile } from '../utils/cleanJsFile'

export default class Dev extends Command {
  static description = 'Runs the app in development mode'

  static examples = ['$ tie dev']
  static args = [{ name: 'serverPath' }]

  async run() {
    const { args } = this.parse(Dev)
    const serverPath: string = args.serverPath
    const cwd = process.cwd()
    const command = getCommand()
    const tsconfigPath = join(cwd, 'tsconfig.json')
    const tsconfig = require(tsconfigPath)
    const tsconfigPathsString = tsconfig.compilerOptions.baseUrl
      ? '-r tsconfig-paths/register'
      : ''

    const entry = serverPath ? resolve(cwd, serverPath) : appPath

    const exec = `ts-node ${tsconfigPathsString} --project ${tsconfigPath} ${entry}`

    // TODO: 需要完善
    const startArgs: string[] = [
      '--watch',
      './**/*.ts',
      '--ext',
      'ts',
      '--ignore',
      './**/*.test.ts',
      '--exec',
      exec,
    ]

    cleanJsFile(cwd)

    const child = spawn(command, startArgs, { stdio: 'inherit' })

    child.on('close', code => {
      if (code !== 0) {
        // TODO: handle ERROR
        console.log('Error~')
      }
    })
  }
}
