import inquirer from 'inquirer'
import { projectType } from './projectType.enum'

export async function getProjectType() {
  const answer: any = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: '选择项目模板？',
      choices: [
        projectType.MINIMAL_CONTROLLER,
        projectType.MINIMAL_GRAPHQL,
        projectType.SIMPLE_CONTROLLER,
        projectType.SIMPLE_GRAPHQL,
      ],
    },
  ])
  return answer.projectType
}
