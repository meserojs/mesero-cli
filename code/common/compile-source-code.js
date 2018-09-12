const path = require('path')
const del = require('del')
const shell = require('shelljs')
const fs = require('fs-extra')

module.exports = async function () {
  const { rootDir } = global.config

  shell.cd(rootDir)

  const srcPath = path.resolve(rootDir, 'src')
  const distPath = path.resolve(rootDir, 'dist')

  del.sync(distPath, { force: true })

  fs.copySync(srcPath, distPath)

  await new Promise((resolve, reject) => {
    shell.exec(`npx babel ./src --ext .js --out-dir ./dist`, { async: true, silent: true }, (code, stdout, stderr) => {
      if (code === 0) {
        resolve()
      } else {
        console.log(`code: ${code}`)
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      }
    })
  })
}
