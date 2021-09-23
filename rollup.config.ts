import typescript from "@rollup/plugin-typescript"
import copy from "rollup-plugin-copy2"
import zip from 'rollup-plugin-zip'
import { uglify } from "rollup-plugin-uglify"
import strip from '@rollup/plugin-strip'
import banner from 'rollup-plugin-banner'
import json from "@rollup/plugin-json"
import mnaddon from './mnaddon.json'

// 修改为你电脑的用户名
const userName = "ourongxing"

// 判断是否为开发环境
const isProd = () => process.env.NODE_ENV === 'production'
const _banner = `THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source code, please visit the github repository
https://github.com/ourongxing/copysearch
version: ${mnaddon.version} by ${mnaddon.author}`;


const dir = isProd() ? "./dist" : `/Users/${userName}/Library/Containers/QReader.MarginStudyMac/Data/Library/MarginNote Extensions/${mnaddon.addonid}`
export default {
  input: ["src/main.ts"],
  output: {
    dir,
    format: "iife",
    exports: "none",
    sourcemap: false,
  },
  watch: {
    exclude: '../node_modules/**'
  },
  plugins: [
    json(),
    typescript(),
    copy({
      assets: [
        "mnaddon.json",
        ["assets/logo.png", "logo.png"]
      ]
    }),
    isProd() && strip({
      include: ["**/*.ts",],
      functions: ["log"]
    }),
    isProd() && uglify(),
    isProd() && banner(_banner),
    isProd() && zip({
      file: `${mnaddon.addonid.split(".")[2]}_${mnaddon.version}.mnaddon`
    })
  ],
}