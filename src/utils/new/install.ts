import spawn from 'cross-spawn'
import path from 'path'
import { projectType } from './projectType.enum'

const deps = {
  [projectType.MINIMAL_CONTROLLER]: [
    '@tiejs/controller@latest',
    '@tiejs/core@latest',
    'tiec-cli@latest',
  ],

  [projectType.MINIMAL_GRAPHQL]: [
    '@tiejs/common@latest',
    '@tiejs/core@latest',
    '@tiejs/graphql@latest',
    'tie-cli@latest',
  ],
  [projectType.SIMPLE_CONTROLLER]: [
    '@tiejs/common@latest',
    '@tiejs/controller@latest',
    '@tiejs/core@latest',
    '@tiejs/graphql@latest',
    'tie-cli@latest',
  ],
  [projectType.SIMPLE_GRAPHQL]: [
    '@tiejs/common@latest',
    '@tiejs/controller@latest',
    '@tiejs/core@latest',
    '@tiejs/graphql@latest',
    'tie-cli@latest',
  ],
}

type Type =
  | projectType.MINIMAL_CONTROLLER
  | projectType.MINIMAL_GRAPHQL
  | projectType.SIMPLE_CONTROLLER
  | projectType.SIMPLE_GRAPHQL

export function install(root: string, type: Type) {
  const command = 'npm'
  process.chdir(root)
  const args: string[] = ['i', ...deps[type]]

  const child = spawn(command, args, { stdio: 'inherit' })

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0) {
        // TODO: handle ERROR
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }

      process.chdir(path.resolve(root, '..'))
      resolve()
    })
  })
}
