import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/client/index.tsx'],
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2024',
  clean: false,
  dts: false,
  sourcemap: false,
  external: ['react', 'react/jsx-runtime'],
  noExternal: [/^highlight\.js/, /^lucide-react/, /^@xterm\//],
  alias: { 'lucide-react': 'lucide-react/dist/esm/lucide-react.mjs' },
  outputOptions: {
    entryFileNames: 'client.js',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
    banner: 'window.__ModuleLoader__.load({ id: "dsh-workspace", factory: (require) => {',
    footer: 'return module.exports; } });',
  },
})
