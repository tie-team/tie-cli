import { Command, flags } from '@oclif/command'
import spawn from 'cross-spawn'
import { join, resolve } from 'path'

import { getNodemon } from '../utils/getNodemon'
import { getWebpack } from '../utils/getWebpack'
import { appPath } from '../utils/paths'
import { cleanJsFile } from '../utils/cleanJsFile'
import { genApp } from '../generators/app'
import { genPluginsConfig } from '../generators/plugins'
import { genConfig } from '../generators/config'
import { genControllers } from '../generators/controllers'
import { genResolvers } from '../generators/resolvers'

export default class Dev extends Command {
  static description = 'Runs the app in development mode'

  static examples = ['$ tie dev']

  static flags = {
    webpack: flags.boolean({ char: 'w' }),
    main: flags.string({ char: 'm' }),
  }

  private cwd = process.cwd()
  private entry: string = ''
  private tsconfigPath = join(this.cwd, 'tsconfig.json')
  private tsconfig = require(this.tsconfigPath)
  private tsconfigPathsString = this.tsconfig.compilerOptions.baseUrl
    ? '-r tsconfig-paths/register'
    : ''

  private useTsNode() {
    const exec = `ts-node ${this.tsconfigPathsString} --project ${this.tsconfigPath} ${this.entry}`

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

    const nodemon = getNodemon()
    const child = spawn(nodemon, startArgs, { stdio: 'inherit' })

    child.on('close', (code) => {
      if (code !== 0) {
        // TODO: handle ERROR
        console.log('Error~')
      }
    })
  }

  private useWebpack() {
    const baseDir = join(__dirname, '..', '..')
    const webpackConfigPath = join(baseDir, 'webpack.config.js')
    const startArgs: string[] = ['--config', webpackConfigPath]
    const webpack = getWebpack()
    const child = spawn(webpack, startArgs, { stdio: 'inherit' })

    child.on('close', (code) => {
      if (code !== 0) {
        // TODO: handle ERROR
        console.log('Error~')
      }
    })
  }

  async run() {
    const { flags } = this.parse(Dev)
    const cwd = process.cwd()
    const { main, webpack = false } = flags
    this.entry = main ? resolve(cwd, main) : appPath

    cleanJsFile(cwd)

    await Promise.all([
      genControllers(),
      genResolvers(),
      genPluginsConfig(),
      genConfig(),
      genApp(),
    ])

    if (webpack) {
      this.useWebpack()
    } else {
      this.useTsNode()
    }
  }
}
