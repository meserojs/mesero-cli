const shell = require('shelljs')

const compileSourceCode = require('./common/compile-source-code')

module.exports = async function ({ env = 'dev' }) {
  const { main } = global.config

  await compileSourceCode()

  shell.exec(`set NODE_ENV=${env} && node ${main}`)
}
