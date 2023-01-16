import { rollup, InputOptions, OutputOptions } from 'rollup'
import { inputOptions, outputOptionsList } from "./rollup.config";

/**
 * 总的来说分两步：根据inputOptions build和根据outputOptions generate/write。
 * rollup方法可以生成bundle
 * bundle.generate可以返回打包后文件的预览；bundle.write可以生成打包后的文件。
 * bundle.generate生成一个仅带有output属性的对象，此属性是个数组。
 */
/**
 * Rollup JS API 的使用分为两部分：
 * 打包阶段：调用 rollup 函数，传入 input 配置，会得到 bundle 对象，此时不会生成代码。
 * 生成阶段：有以下两种方式
 *  调用 bundle.generate，传入 output 配置，得到构建后的代码。
 *  调用 bundle.write，传入 output 配置，根据 output 配置，将构建后代码写入到磁盘。
 */

let bundle;
let buildFailed = false;
try {
    bundle = await rollup(inputOptions)
    // console.log(`bundle:`,bundle);
    for (const outputOptions of outputOptionsList) {

        const { output: chunkOrAssetArr } = await bundle.generate(
            outputOptions as OutputOptions
        );
        for (const chunkOrAsset of chunkOrAssetArr) {
            console.log(`chunkOrAsset:`, chunkOrAsset);
        }

        Promise.all(
            outputOptionsList.map((config) =>
                bundle.write(config as OutputOptions)
            )
        );
    }
} catch (error) {
    console.log(`error:`,error);
    buildFailed = true
}
if (bundle) {
    await bundle.close();
}

