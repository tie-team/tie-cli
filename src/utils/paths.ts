import fs from 'fs'
import path from 'path'

export const appDir = path.resolve(fs.realpathSync(process.cwd()))
export const srcDir = path.resolve(fs.realpathSync(process.cwd()), 'src')

export const tmpDir = `${appDir}/src/.tie`
export const tmpAppPath = `${appDir}/src/.tie/app.ts`
export const localAppPath = `${appDir}/src/app.ts`
