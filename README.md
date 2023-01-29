> 环境\
> node V18.13.0\
> pnpm V7.14.1\
> yarn 1.22.18

# rollup通过配置文件和api两种方式打包vue3组件的mvp

`packages`目录：专门存放组件，通过一个`index.ts`文件总导出。

执行`build-lib:vite`，通过vite的模式打包；\
执行`build-lib:file`，通过rollup的配置文件打包；\
执行`build-lib:api`，通过rollup的js api打包；

也可以在根目录下运行gulp命令，通过gulp来自动执行上面几种类型的打包。

