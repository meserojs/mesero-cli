const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const compileSourceCode = require('./common/compile-source-code')

const NASO_PM2_CONFIG_FILENAME = 'naso.pm2.config.js'

module.exports = async function (action, { env = 'production' }) {
  const { rootDir } = global.config

  const pm2Config = path.resolve(rootDir, NASO_PM2_CONFIG_FILENAME)

  if (!fs.existsSync(pm2Config)) {
    console.error(`miss ${NASO_PM2_CONFIG_FILENAME}`)

    process.exit(1)
  }

  await compileSourceCode()

  const { envs } = require(path.resolve(rootDir, NASO_PM2_CONFIG_FILENAME))

  if (!envs[env]) {
    console.error(`app for this env not undefined`)

    process.exit(1)
  }

  shell.cd(rootDir)

  shell.exec(`pm2 ${action} ${NASO_PM2_CONFIG_FILENAME} --only "${envs[env]}"`)
}
