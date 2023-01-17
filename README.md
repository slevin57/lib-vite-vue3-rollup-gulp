> 环境\
> node V18.13.0\
> pnpm V7.14.1\
> yarn 1.22.18

# rollup通过配置文件和api两种方式打包vue3组件的mvp

`packages`目录：专门存放组件，通过一个`index.ts`文件总导出。

执行`build-lib:vite`，通过vite的模式打包；
执行`build-lib:file`，通过rollup的配置文件打包；
执行`build-lib:api`，通过rollup的js api打包；


注意rollup版本v2和v3的区别，例如json文件的引入，esm模块化规范解析的区别，具体可参考[rollup官方文档](https://rollupjs.org/guide/en/#prerequisites)。
1. 不能像之前一样直接通过import引入json文件
2. 不能使用`__dirname`


rollup V3默认使用原生Node ESM解析esm模块，如果想用回cjs，可以添加命令行参数`--bundleConfigAsCjs`或者配置文件以`.mjs`结尾；如果配置文件后缀是`.ts`，需要安装插件`@rollup/plugin-typescript`并配合命令行参数`--configPlugin typescript`来执行配置文件。

`--configPlugin`允许指定 Rollup 插件来转译或以其他方式控制配置文件的解析。
例如如果配置文件是typescript写的话，可以这样执行，rollup会在运行配置文件之前先将它转换为ES语法：
```js 
rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
```
注意，如果想真正生效的话，rollup配置文件的路径也要放到tsconfig.json文件中的include属性里（如果报错多的话不放也可以）：
```js
"include": ["src/**/*", "rollup.config.ts"],
```

`--bundleConfigAsCjs`参数可以强制使用旧的加载/打包行为，会强制把配置文件先转换为CommonJS语法。这样即使配置本身是作为 ES 模块编写的，但也可以使用像 __dirname 或 require.resolve 这样的 CommonJS 语法。



V3之前的版本可以在配置文件中简单直接import jsno file，但是V3之后不行，官方提供了3种处理方式。