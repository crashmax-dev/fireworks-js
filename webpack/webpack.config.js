const path = require('path')
const pkg = require('../package.json')

module.exports = {
  port: 8080,
  version: JSON.stringify(pkg.version),
  banner: `${pkg.name} ${pkg.version} by ${pkg.author.name} (${pkg.author.url})\n${pkg.homepage}\nLicense ${pkg.license}`,
  paths: {
    entry: {
      fireworks: path.resolve(__dirname, '../src/fireworks.ts'),
      react: path.resolve(__dirname, '../src/react.ts')
    },
    output: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../public')
  }
}