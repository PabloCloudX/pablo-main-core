const path = require('path')
const fs = require('fs')

function pfile(relPath) {
  if (!relPath.startsWith('./')) {
    return require(relPath)
  }
    
  const absPath = path.join(process.cwd(), relPath)
  return require(absPath)
}

function ppath(relPath) {
  return path.resolve(process.cwd(), relPath)
}

module.exports = { pfile, ppath }
