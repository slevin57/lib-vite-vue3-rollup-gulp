// 处理vue文件插件
import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
// 处理css文件插件
import css from "rollup-plugin-css-only";
// 处理ts插件
import typescript from "rollup-plugin-typescript2";
// 用于在节点单元模块中使用第三方模块
import { nodeResolve } from "@rollup/plugin-node-resolve";

// import pkg,{ version } from "./package.json";
// console.log(`pkg1:`,pkg);
// console.log(`version:`,version);

import pkg from "./package.json" assert { type: "json" };  // 需要Node 17.5+
// console.log(`pkg:`,pkg);


// 打包的方式：file-配置文件  api-rollup的api 
const distDir = `lib-${process.env.BUILD_MODE || "rollup"}`;
// 输出打包后的文件名称name 1.esm 2.umd
const name = pkg.name
const file = (type) => `__${distDir}/${name}.${type}.js`;

const overrides = {
    compilerOptions: { declaration: true }, // 生成.d.ts的文件
    exclude: ["tests/**/*.ts", "tests/**/*.tsx"],
};
export { name, file };

export const inputOptions = {
    input: "packages/index.ts",
    external: ["vue", "lodash-es"], // 规定哪些是外部引用的模块
    plugins: [
        vue(),
        nodeResolve(),
        commonjs(),
        typescript({ tsconfigOverride: overrides }),
        css({ output: "bundle.css" }), // 可自行修改output文件名
    ],
};

export const outputOptionsList = [
    {
        file: file("esm"),
        format: "es",
    },
    {
        name: "thComponents",
        file: file("umd"),
        format: "umd",
        globals: {
            // 设定全局变量的名称
            vue: "Vue",
            "lodash-es": "_",
        },
        exports: "named",
    },
];

export default {
    ...inputOptions,
    output: outputOptionsList
}
