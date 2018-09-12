#!/usr/bin/env node

const program = require('commander')
const { version } = require('./package.json')

global.config = require('./code/common/set-config')()

program
  .version(version)
  .option('-v, --version', 'output the version number')
  .description('Naso-CLI')

program
  .command('init')
  .description('init project')
  .action(require('./code/init.js'))

program
  .command('dev')
  .option('--env <env>')
  .description('dev the server')
  .action(require('./code/dev'))

program
  .command('start')
  .option('--env <env>')
  .description('start the server')
  .action((options) => require('./code/pm2')('start', options))

program
  .command('stop')
  .option('--env <env>')
  .description('stop the server')
  .action((options) => require('./code/pm2')('stop', options))

program
  .command('delete')
  .option('--env <env>')
  .description('delete the server')
  .action((options) => require('./code/pm2')('delete', options))

program.parse(process.argv)
