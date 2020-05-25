import { join } from 'path'
import { Project } from 'ts-morph'
import saveSourceFile from '../utils/saveSourceFile'

export async function genPluginsConfig() {
  const outPath = join(process.cwd(), 'generated', 'tie.plugins.config.ts')
  const project = new Project()

  const sourceFile = project.createSourceFile(outPath, undefined, {
    overwrite: true,
  })

  sourceFile.addStatements(`import { PluginConfig } from '@tiejs/common'
import Logger from '@tiejs/logger'
import View from '@tiejs/view'
import Controller from '@tiejs/controller'
import Graphql from '@tiejs/graphql'

export const tiePlugins: PluginConfig = [
  {
    name: 'logger',
    main: Logger,
    enable: true,
  },
  {
    name: 'view',
    main: View,
    enable: true,
  },
  {
    name: 'controller',
    main: Controller,
    enable: true,
  },
  {
    name: 'graphql',
    main: Graphql,
    enable: true,
  },
]`)

  await saveSourceFile(sourceFile)
}
