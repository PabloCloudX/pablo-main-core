process.chdir(process.cwd())

async function startbot() {
  require('./index')
}

module.exports = { startbot }
