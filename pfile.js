const path = require('path')
const fs = require('fs')

const DEFAULT_EXTENSIONS = ['.js', '.json', '.node']

function resolveFile(relPath) {
  const absPath = path.isAbsolute(relPath)
    ? relPath
    : path.resolve(process.cwd(), relPath)

  if (fs.existsSync(absPath) && fs.statSync(absPath).isDirectory()) {
    return absPath
  }

  if (fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
    return absPath
  }

  for (const ext of DEFAULT_EXTENSIONS) {
    const tryPath = absPath + ext
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()) {
      return tryPath
    }
  }

  throw new Error(`Path not found: ${relPath}`)
}

function pfile(relPath) {
  const filePath = resolveFile(relPath)
  return require(filePath)
}

function ppath(relPath) {
  return resolveFile(relPath)
}

module.exports = { pfile, ppath }
