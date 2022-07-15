export default {
  files: ['./packages/**/*.test.ts'],
  extensions: {
    ts: 'module'
  },
  nodeArguments: ['--loader=tsx', '--no-warnings']
}
