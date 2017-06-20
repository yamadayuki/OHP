// @flow
import fs from 'fs'
import path from 'path'

const map = {}
const pkgPath = path.resolve(__dirname, '..')
const rootPath = path.resolve(pkgPath, '..', '..')
const modulesPath = path.resolve(rootPath, 'node_modules')
const cssFilePattern = /(.*)\.css$/
const outputPathBase = path.resolve(pkgPath, 'src', 'styles', 'vendor')

const hljsStylesPath = path.resolve(modulesPath, 'highlight.js', 'styles')

map['highlight.js'] = fs.readdirSync(hljsStylesPath)
  .filter(f => cssFilePattern.test(f))
  .map(f => path.resolve(hljsStylesPath, f))
map['normalize.css'] = [path.resolve(modulesPath, 'normalize.css', 'normalize.css')]

Object.keys(map).forEach((key) => {
  const outputDir = path.join(outputPathBase, key)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  map[key].forEach((file) => {
    const body = [
      `// Automatically generated by ${path.relative(pkgPath, __filename)} at ${new Date().toString()}`,
      `// Imported ${path.basename(file)} file from ${key}`,
      'export default `',
      fs.readFileSync(file).toString().replace(/`/g, '\\`').replace(/\t/g, '  '),
      '`\n',
    ].join('\n')
    const outputPath = path.join(outputDir, `${path.basename(file)}.js`)
    fs.writeFileSync(outputPath, body, { encoding: 'utf8' })
    console.log(`- ${path.relative(rootPath, outputPath)}`)
  })
})

console.log('\nGenerate successfully!')