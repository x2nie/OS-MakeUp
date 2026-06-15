import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import sharedThemes from './tools/sharedThemes';


export default defineConfig({
  plugins: [
    sharedThemes(),
  ]
})