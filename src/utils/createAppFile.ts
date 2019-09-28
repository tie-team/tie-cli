import fs from 'fs-extra'

import { tmpAppPath, tmpDir } from './paths'
import { APP_CODE } from './texts'

export const createAppFile = () => {
  fs.ensureDirSync(tmpDir)
  fs.writeFileSync(tmpAppPath, APP_CODE, { encoding: 'utf8' })
}
