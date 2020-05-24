import { join } from 'path'
import { Project, VariableDeclarationKind } from 'ts-morph'
import saveSourceFile from '../utils/saveSourceFile'

export async function genApp() {
  const outPath = join(process.cwd(), 'generated', 'app.ts')
  const project = new Project()

  const sourceFile = project.createSourceFile(outPath, undefined, {
    overwrite: true,
  })

  sourceFile.addStatements(`import { Application } from '@tiejs/core'
import { config } from './config'

const app = new Application(config)
app.bootstrap()`)

  await saveSourceFile(sourceFile)
}
