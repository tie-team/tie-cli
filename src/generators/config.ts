import path from 'path'
import { join } from 'path'
import saveSourceFile from '../utils/saveSourceFile'
import globby, { GlobbyOptions } from 'globby'
import { Project, VariableDeclarationKind } from 'ts-morph'

const patterns = ['config/**/*.ts']
const cwd = process.cwd()

export function loadFiles() {
  let files: string[] = []
  for (const item of patterns) {
    let pattern: any
    const opt: GlobbyOptions = {
      ignore: ['**/node_modules/**'],
      onlyFiles: true,
      cwd,
    }
    if (typeof item === 'string') pattern = item
    const paths = globby.sync(pattern, opt).map((i) => join(cwd, i))
    files = [...files, ...paths]
  }
  return files.map((i) => i.split(path.sep).join('/'))
}

export async function genConfig() {
  const outPath = join(process.cwd(), 'generated', 'config.ts')
  const project = new Project()

  const sourceFile = project.createSourceFile(outPath, undefined, {
    overwrite: true,
  })

  sourceFile.addStatements(`import { Config } from '@tiejs/common'
import { plugins } from './plugins.config'
import * as resolvers from './resolvers'
import * as controllers from './controllers'
`)

  const modules = loadFiles()
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,

    declarations: [
      {
        name: 'modules',
        type: 'any[]',
        initializer: `[
          ${modules
            .map((i) => `require('${i.replace(/\.ts$/, '')}')`)
            .join(',\n')}
        ]`,
      },
    ],
    isExported: true,
  })

  sourceFile.addStatements(`
export const config = modules.reduce(
  (result, cur) => {
    for (const key of Object.keys(cur)) {
      if (key === 'default') {
        result = { ...result, ...cur[key] }
      } else {
        result[key] = cur[key]
      }
    }
    return result
  },
  {
    plugins,
    resolvers: Object.values(resolvers),
    controllers: Object.values(controllers),
  } as Config,
)
  `)

  await saveSourceFile(sourceFile)
}
