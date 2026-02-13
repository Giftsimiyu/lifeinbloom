const fs = require('fs')
const path = require('path')

const IGNORES = ['node_modules', '.next', 'dist']
const ROOT = path.resolve(__dirname, '..')

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    if (IGNORES.some((i) => filepath.includes(i))) return
    if (stat.isDirectory()) filelist = walk(filepath, filelist)
    else filelist.push(filepath)
  })
  return filelist
}

function scan() {
  const exts = ['.tsx', '.jsx', '.ts', '.js', '.html']
  const files = walk(ROOT).filter((f) => exts.includes(path.extname(f)))
  const matches = []
  files.forEach((f) => {
    const content = fs.readFileSync(f, 'utf8')
    if (content.includes('<img ')) {
      matches.push(f)
    }
  })

  if (matches.length) {
    console.log('\nFound plain <img> usages (consider converting to next/image):')
    matches.forEach((m) => console.log(' -', path.relative(ROOT, m)))
    process.exitCode = 1
  } else {
    console.log('\nNo plain <img> tags found.')
  }
}

scan()
