import semver from "semver";
import inquirer from "inquirer";
import { resolve, dirname } from 'path'
import { createRequire } from "module";
import { writeFileSync } from 'node:fs'
// import pkgJson from "./package.json" assert { type: "json" };

/**
 * 通过参数直接自定义
 * 手动选择
 * 没有选项，自定义输入
 * 提示文案高亮
 * prerelease版本更新支持
 * 路径找不到退出/提示及可选支持
 */

const require = createRequire(import.meta.url)
const pkgPath = resolve(process.cwd(), './package.json')
const pkgJson = require(pkgPath)
const currentV = pkgJson.version || '1.2.3'
let targetV = ''
const releaseTypes = [
    'patch',
    'minor',
    'major',
    'prepatch',
    'preminor',
    'premajor',
    // 'prerelease',
]

// const rawcChoices = releaseTypes.map((t) => ({
//     preview: semver.inc(currentV, t),
//     string: `${t} (${semver.inc(currentV, t)})`,
// }));
// const choices = rawcChoices.map((i) => i.string)

const choices = releaseTypes.map((t) => ({
    name: `${t} (${semver.inc(currentV, t)})`,
    value: semver.inc(currentV, t),
    short: semver.inc(currentV, t),
}))
choices.push({
    name: "手动输入",
    value: undefined,
})
choices.push(new inquirer.Separator('---end---'));

async function doAsk() {
    let version = ''
    const questions = [
        {
            type: "list",
            name: "autoVersion",
            loop: true,
            message: `请选择版本号(当前为${currentV})`,
            choices,
            // filter: (v) => rawcChoices.find((i) => i.string === v).preview,
        },
        {
            type: "input",
            name: "manualVersion",
            message: "手动输入版本号",
            when(hash) {
                return hash.autoVersion === undefined;
            },
            validate(answer, hash) {
                const isVersionlegal =
                    semver.valid(answer) && semver.gt(answer, currentV);
                const errMsg = "版本号格式有误或低于当前版本，请重新输入";
                return isVersionlegal || errMsg;
            },
        },
        {
            type: "confirm",
            name: "confirm",
            message(hash) {
                version = hash.autoVersion || hash.manualVersion;
                return `确认要升级的版本号：${version}(需要重新选择的话输入"n/N")`;
            },
        },
    ];

    const answers = await inquirer.prompt(questions);

    if (!answers.confirm) {
        console.log(`否认=====:`, answers, version);
        version = await doAsk();
    }
    console.log(`确认=====:`, answers, version);
    return version;
}

// targetV = await doAsk()
console.log(`targetV====:`,targetV);


// 写入pkg.json
async function doAskWrite(){
    pkgJson.version = await doAsk();
    writeFileSync(pkgPath, JSON.stringify(pkgJson, null, "\t"));
}

export {
    doAsk,
    doAskWrite
}