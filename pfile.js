const path = require('path')

function normalizeRelPath(relPath) {
  if (path.isAbsolute(relPath)) return relPath 
  if (relPath.startsWith('./') || relPath.startsWith('../')) return relPath
  return './' + relPath
}

function pfile(relPath) {
  const finalPath = path.resolve(process.cwd(), normalizeRelPath(relPath))
  return require(finalPath)
}

function ppath(relPath) {
  return path.resolve(process.cwd(), normalizeRelPath(relPath))
}

module.exports = { pfile, ppath }
