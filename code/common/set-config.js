const fs = require('fs-extra')
const path = require('path')

module.exports = function () {
  const rootDir = process.cwd()

  const config = {
    rootDir
  }

  const projectPackageJsonPath = path.resolve(rootDir, 'package.json')

  if (fs.existsSync(projectPackageJsonPath)) {
    const { main } = fs.readJsonSync(projectPackageJsonPath)
    config.main = main
  }

  return config
}
