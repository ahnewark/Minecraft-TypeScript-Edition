import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

/** @type { import('rollup').RollupOptions } */
export default {
  input: [
    './src/index.ts'
  ],
  output: {
    dir: 'dist',
    chunkFileNames: production ? "chunks/[name]-[hash].js" : "chunks/[name].js",
    format: 'iife',
    sourcemap: !production
  },
  watch: { clearScreen: false },
  treeshake: production,
  // external: [
  //   'three', /three\/.*/, 'long', 'chat', 'aes-js'
  // ],
  plugins: [
    esbuild({ tsconfig: 'tsconfig.build.json', sourceMap: !production, minify: production, legalComments: 'none' , platform: 'browser'}),
    alias({}),
    nodeResolve({ preferBuiltins: false, browser: true }),
  ],
  preserveEntrySignatures: false
}