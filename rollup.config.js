"use strict";
exports.__esModule = true;
var plugin_typescript_1 = require("@rollup/plugin-typescript");
var rollup_plugin_copy2_1 = require("rollup-plugin-copy2");
var rollup_plugin_zip_1 = require("rollup-plugin-zip");
var rollup_plugin_uglify_1 = require("rollup-plugin-uglify");
var plugin_strip_1 = require("@rollup/plugin-strip");
var rollup_plugin_banner_1 = require("rollup-plugin-banner");
var plugin_json_1 = require("@rollup/plugin-json");
var mnaddon_json_1 = require("./mnaddon.json");
// 修改为你电脑的用户名
var userName = "linlifei";
// 判断是否为开发环境
var isProd = function () { return process.env.NODE_ENV === 'production'; };
var _banner = "THIS IS A GENERATED/BUNDLED FILE BY ROLLUP\nif you want to view the source code, please visit the github repository\nhttps://github.com/ourongxing/copysearch\nversion: " + mnaddon_json_1["default"].version + " by " + mnaddon_json_1["default"].author;
var dir = isProd() ? "./dist" : "/Users/" + userName + "/Library/Containers/QReader.MarginStudyMac/Data/Library/MarginNote Extensions/" + mnaddon_json_1["default"].addonid;
exports["default"] = {
    input: ["src/main.ts"],
    output: {
        dir: dir,
        format: "iife",
        exports: "none",
        sourcemap: false
    },
    watch: {
        exclude: '../node_modules/**'
    },
    plugins: [
        (0, plugin_json_1["default"])(),
        (0, plugin_typescript_1["default"])(),
        (0, rollup_plugin_copy2_1["default"])({
            assets: [
                "mnaddon.json",
                ["assets/logo.png", "logo.png"]
            ]
        }),
        isProd() && (0, plugin_strip_1["default"])({
            include: ["**/*.ts",],
            functions: ["log"]
        }),
        isProd() && (0, rollup_plugin_uglify_1.uglify)(),
        isProd() && (0, rollup_plugin_banner_1["default"])(_banner),
        isProd() && (0, rollup_plugin_zip_1["default"])({
            file: mnaddon_json_1["default"].addonid.split(".")[2] + "_" + mnaddon_json_1["default"].version + ".mnaddon"
        })
    ]
};
