import { defineConfig } from 'vite'
import { resolve, relative } from 'path'
import { globSync } from 'glob'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const entries = Object.fromEntries(

  globSync('themes/**/theme*.scss').map(file => {

    const name = file.replace(/\.scss$/, '')

    return [name, resolve(file)]
  })
)

export default defineConfig({
  plugins: [

    viteStaticCopy({
      targets: [
        {
          src: 'themes/**/skins/*.css',
          dest: ''
        }
      ]
    })
  ],

  build: {

    outDir: 'dist',
    cssCodeSplit: true,
    rollupOptions: {

      input: entries,
      output: {

        assetFileNames(assetInfo) {

          if (assetInfo.name?.endsWith('.css')) {
            return assetInfo.name
          }

          return 'assets/[name][extname]'
        }
      }
    }
  }
})