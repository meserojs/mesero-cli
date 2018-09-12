const prompt = require('inquirer').prompt
const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')

const replaceInfo = (content, { name }) => {
  return content.replace(/\[name\]/g, name)
}

module.exports = async function () {
  const { rootDir } = global.config

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: '项目名称',
      default: '',
      validate (input) {
        const done = this.async()

        !input ? done('项目名称不能为空') : done(null, true)
      }
    }
  ]

  const { name } = await prompt(questions)

  const projectPath = path.resolve(rootDir, name)

  if (fs.existsSync(projectPath)) {
    console.error('Project exists')

    process.exit(1)
  }

  fs.mkdirsSync(projectPath)

  const templatePath = path.resolve(__dirname, '../template')

  const files = fs.readdirSync(templatePath).filter(v => v !== '.DS_Store' && !fs.statSync(path.resolve(templatePath, v)).isDirectory())

  for (let file of files) {
    const fileContent = replaceInfo(fs.readFileSync(path.resolve(templatePath, file), 'utf8'), { name })

    file.indexOf('~~') === 0 && (file = file.replace(/~~/, '.'))

    fs.writeFileSync(path.resolve(projectPath, file), fileContent)
  }

  fs.copySync(path.resolve(templatePath, 'src'), path.resolve(projectPath, 'src'))

  shell.cd(projectPath)

  shell.exec('yarn install').code === 0 && console.log('Success') && process.exit(0)
}
