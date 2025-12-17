const path = require('path')

function pfile(relPath) {
  const filePath = path.isAbsolute(relPath)
    ? relPath
    : path.resolve(process.cwd(), relPath)

  return require(filePath)
}

function ppath(relPath) {
  return path.isAbsolute(relPath)
    ? relPath
    : path.resolve(process.cwd(), relPath)
}

module.exports = { pfile, ppath }
