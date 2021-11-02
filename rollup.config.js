
import json from '@rollup/plugin-json'
import typescript  from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'

import { cleandir } from 'rollup-plugin-cleandir'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const extensions = ['.js', '.ts']

module.exports = {
  input: [
    './src/Vis.ts'
  ],
  output: {
    dir: './dist',
    format: 'esm'
  },
  plugins: [
    cleandir('./dist'),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext"
        }
      },
    }),
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferredBuiltins :false
    }),
    json(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ],
}