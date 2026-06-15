import { defineConfig } from 'vite'
import { resolve, relative } from 'path'
import { globSync } from 'glob'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

const entries = Object.fromEntries([
    ...globSync('themes/**/theme*.scss'),
    ...globSync('themes/**/skins/*.css')
  ].map(file => {

    const name = file.replace(/\.(scss|css)$/, '')
    return [name, resolve(file)]
  })
)

export default defineConfig({
  plugins: [

    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'themes/**/skins/*.css',
    //       dest: ''
    //     },
    //     // {
    //     //   src: 'themes/**/img/**/*',
    //     //   dest: ''
    //     // }
    //   ]
    // })
  ],

  base: './',
  build: {

    outDir: 'dist',
    assetsInlineLimit: 0, // 0 means no inlining, all assets will be emitted as separate files
    // cssCodeSplit: true,
    minify: false,
    rollupOptions: {

      input: {...entries,
        index: resolve('index.html'),
        scooped: resolve('scooped.html'),
      },
      output: {

        assetFileNames(assetInfo) {

          if (assetInfo.name?.endsWith('.css')) {
            return assetInfo.name
          }
          // console.log('>>assetInfo', assetInfo)

          // return 'assets/[name][extname]'
          return assetInfo.originalFileName
        }
      }
    }
  }
})