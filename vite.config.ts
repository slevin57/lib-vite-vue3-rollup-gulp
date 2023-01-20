import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { loadEnv, UserConfig } from "vite";

export default defineConfig(({ mode }) => {
    // 用来支持在vite.config.ts文件中获取环境变量,方式：process.env.**
    Object.assign(process.env, loadEnv(mode, process.cwd()));
    console.log(`mode:`, mode);
    console.log(`process.env.VITE_BASE_API:`, process.env.VITE_BASE_API);
    // 是否是库模式打包
    const isLib = mode === 'lib'
    const userConfig = {
        plugins: [vue()],
        build: {
            outDir: isLib ? "__lib-vite" : '__dist',
            // 可以去掉这个选项查看打包后的文件大小/内容行数，对比有无external的区别
            rollupOptions: {
                external: ["vue"],
                output: {
                    globals: {
                        vue: "Vue",
                    },
                },
            },
        },
    };

    const libConfig = {
        entry: resolve(__dirname, "./packages/index.ts"),
        // entry: [
        //     resolve(__dirname, "./packages/index.ts"),
        //     resolve(__dirname, "./packages/entry2.ts"),
        // ],
        // entry: {
        //     indexAlias: resolve(__dirname, "./packages/index.ts"),
        //     alias2: resolve(__dirname, "./packages/entry2.ts"),
        // },
        name: "mylib",
        fileName: "my-lib",
        // fileName: (format, alias) => {
        //     console.log(`format:`, format);
        //     console.log(`alias:`, alias);
        //     return `${alias}.${format}.js`;
        // },
    };

    if(isLib){
        (userConfig as UserConfig).build.lib = libConfig;
    }

    return userConfig
});

