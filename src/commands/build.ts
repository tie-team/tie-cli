import { Command } from '@oclif/command'
import { join } from 'path'
import spawn from 'cross-spawn'
import { removeSync } from 'fs-extra'
import { existsSync } from 'fs'
import ora from 'ora'
import { tmpAppPath, localAppPath } from '../utils/paths'

function getCommand() {
  const cwd = process.cwd()
  const baseDir = join(__dirname, '..', '..')
  const command = join(cwd, 'node_modules', '.bin', 'tsc')
  if (existsSync(command)) {
    return command
  } else {
    return join(baseDir, 'node_modules', '.bin', 'tsc')
  }
}


// TODO:
function createAppFile(appPath: string, distDir: string) {
  const command = getCommand()
  const args = [
    appPath,
    '--target',
    'es5',
    '--lib',
    'es7,esnext.asynciterable',
    '--moduleResolution',
    'node',
    '--skipLibCheck',
    '--esModuleInterop',
    '--outDir',
    distDir,
  ]
  spawn.sync(command, args, {
    stdio: 'inherit',
  })
}

export default class Build extends Command {
  static description = 'Build the project to dist'

  static examples = [`$ tsnl build`]

  async run() {
    const cwd = process.cwd()
    const command = getCommand()
    const tsconfigPath = join(cwd, 'tsconfig.json')
    const startArgs: string[] = ['--project', tsconfigPath]
    const appPath = existsSync(localAppPath) ? localAppPath : tmpAppPath
    const buildDir = join(cwd, 'build')

    const spinner = ora('Tie building...').start()

    removeSync(buildDir)

    createAppFile(appPath, buildDir)
    spawn.sync(command, startArgs, { stdio: 'inherit' })
    spinner.succeed('Tie build successfully')
  }
}
