import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import path, { join } from 'path'
import yosay from 'yosay'
import fs from 'fs-extra'

import { checkAppDir } from '../utils/new/checkAppDir'
import { createAppDir } from '../utils/new/createAppDir'
import { getProjectType } from '../utils/new/getProjectType'
import { install } from '../utils/new/install'
import { showTips } from '../utils/new/showTips'
import { createPkg } from '../utils/new/createPkg'

const { green, yellow } = chalk

class Create extends Command {
  static description = 'Init a new Tie project'

  static args = [{ name: 'appName' }]

  async run() {
    const { args } = this.parse(Create)
    const templateDir = path.join(__dirname, '..', '..', 'templates')
    const appName: string = args.appName
    if (!appName) {
      return this.log(
        yellow('required project name, eg: '),
        green('tie new myapp'),
      )
    }
    const projectDir = path.resolve(appName)

    console.log(yosay('您正在初始化 tie 项目...'))

    try {
      const projectType = await getProjectType()
      createAppDir(projectDir)
      checkAppDir(projectDir, appName)
      await fs.copy(join(templateDir, projectType), projectDir, {
        overwrite: true,
      })
      await createPkg(appName, projectDir)
      await install(projectDir, projectType)
      showTips(projectDir, appName)
    } catch (error) {
      this.log(error)
    }
  }
}

export = Create
