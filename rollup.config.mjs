import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import nodePollyfills from 'rollup-plugin-polyfill-node';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

/** @type { import('rollup').RollupOptions } */
export default {
  input: [
   './src/index.ts',
  ],
  output: {
    dir: 'dist',
    chunkFileNames: production ? "chunks/[name]-[hash].js" : "chunks/[name].js",
    format: 'iife',
    sourcemap: !production,
  },
  watch: { clearScreen: false },
  treeshake: production,
  plugins: [
    commonjs(),
    alias({}),
    nodeResolve({ preferBuiltins: false, browser: true }),
    nodePollyfills(),
    esbuild({ tsconfig: 'tsconfig.json', sourceMap: true, minify: false, legalComments: 'none' , platform: 'browser'}),
  ],
  preserveEntrySignatures: false
}