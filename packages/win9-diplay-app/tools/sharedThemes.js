import path from 'path'
import fs from 'fs'

export default function vitePluginCssGtk() {
    return {
      name: 'shared-themes',
      enforce: 'pre',
      
            configureServer(server) {
              server.middlewares.use('/themes', (req, res, next) => {
                const base = path.resolve(__dirname, '../../os-makeup/dist/themes')
      
                const filePath = path.join(
                  base,
                  req.url || ''
                )
      
                if (fs.existsSync(filePath)) {
                  fs.createReadStream(filePath).pipe(res)
                  return
                }
      
                next()
              })
            }
        }
  }
  