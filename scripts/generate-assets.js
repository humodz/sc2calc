import * as fs from 'node:fs'
import * as path from 'node:path'

function recurse(dir, root = dir) {
  const result = {}

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(entry.parentPath, entry.name)

    if (entry.isDirectory()) {
      Object.assign(result, recurse(entryPath, root))
      // result[entry.name] = recurse(entryPath, root)
    } else {
      result[path.parse(entry.name).name] = path.relative(root, entryPath)
    }
  }

  return result
}

const assets = recurse('public')

fs.writeFileSync('src/assets.json', JSON.stringify(assets, null, 2))
