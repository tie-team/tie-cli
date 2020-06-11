import path from 'path'
import { join } from 'path'
import fs, { existsSync } from 'fs-extra'
import globby, { GlobbyOptions } from 'globby'
import { Project, VariableDeclarationKind } from 'ts-morph'
import saveSourceFile from '../utils/saveSourceFile'

const patterns = ['config/**/*.ts']
const cwd = process.cwd()

export function loadConfigFiles() {
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

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@tiejs/common',
      namedImports: ['Config'],
    },
  ])

  const resolversPath = join(cwd, 'generated', 'resolvers.ts')
  const controllersPath = join(cwd, 'generated', 'controllers.ts')
  const schedulesPath = join(cwd, 'generated', 'schedules.ts')

  if (existsSync(resolversPath)) {
    sourceFile.addStatements(`import * as resolvers from './resolvers'`)
  }
  if (existsSync(controllersPath)) {
    sourceFile.addStatements(`import * as controllers from './controllers'`)
  }
  if (existsSync(schedulesPath)) {
    sourceFile.addStatements(`import * as schedules from './schedules'`)
  }

  const modules = loadConfigFiles()

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

  const initialResolvers = existsSync(resolversPath)
    ? 'Object.values(resolvers)'
    : '[]'
  const initialControllers = existsSync(controllersPath)
    ? 'Object.values(controllers)'
    : '[]'
  const initialSchedules = existsSync(schedulesPath)
    ? 'Object.values(schedules)'
    : '[]'

  sourceFile.addStatements(`
export const config = modules.reduce(
  (result, cur) => {
    for (const key of Object.keys(cur)) {
      if (key === 'default') {
        result = { ...result, ...cur[key] }
      } else if (key === 'plugins') {
        result[key] = [...result.plugins, ...cur[key]] 
      } else {
        result[key] = cur[key]
      }
    }
    return result
  },
  {
    plugins: [],
    resolvers: ${initialResolvers},
    controllers: ${initialControllers},
  } as Config,
)

  // set modules config
  if(config.schedule) {
    config.schedule.schedules = ${initialSchedules}
  } else {
    config.schedule = { schedules: ${initialSchedules} }
  }

`)

  await saveSourceFile(sourceFile)
}
