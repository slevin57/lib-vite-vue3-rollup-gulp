/**
 * RoadMap
 * [ ] 命令行执行
 * [ ] 通过参数直接自定义
 * [x] 手动选择
 * [x] 支持自定义输入
 * [ ] 提示文案高亮
 * [x] prerelease版本更新支持
 * [x] 路径找不到退出/提示及自定义支持
 */

import semver from "semver";
import inquirer from "inquirer";
import { resolve, dirname } from "path";
import { createRequire } from "module";
import { writeFileSync } from "node:fs";
// import pkgJson from "./package.json" assert { type: "json" };
const require = createRequire(import.meta.url);

let pkgPath = "",
    pkgJson = "",
    currentV = ""

// 询问
async function doAsk() {
    let targetVersion = "";

    const releaseTypes = [
        "prerelease",
        "prepatch",
        "preminor",
        "premajor",
        "patch",
        "minor",
        "major",
    ];

    // const rawcChoices = releaseTypes.map((t) => ({
    //     preview: semver.inc(currentV, t),
    //     string: `${t} (${semver.inc(currentV, t)})`,
    // }));
    // const choices = rawcChoices.map((i) => i.string)

    const choices = releaseTypes.map((t) => ({
        name: `${t} (${semver.inc(currentV, t)})`,
        value: semver.inc(currentV, t),
        short: semver.inc(currentV, t),
    }));

    choices.push({
        name: "手动输入",
        value: undefined,
    });
    choices.push(new inquirer.Separator("---end---"));

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
                targetVersion = hash.autoVersion || hash.manualVersion;
                return `确认要升级的版本号：${targetVersion}(需要重新选择的话输入"n/N")`;
            },
        },
    ];

    const answers = await inquirer.prompt(questions);

    if (!answers.confirm) {
        console.log(`否认=====:`, answers, targetVersion);
        targetVersion = await doAsk();
    }
    console.log(`确认=====:`, answers, targetVersion);
    return targetVersion;
}

// 更新pkg.json的version
async function doWrite(version) {
    pkgJson.version = version;
    writeFileSync(pkgPath, JSON.stringify(pkgJson, null, "\t"));
}

const isObject = (val) => val !== null && typeof val === "object";

/**
 * options 可选参数
 * @param { Boolean } options.write 是否更新package.json文件中的版本号，默认false，只返回更新后的版本号；
 * @param { String } options.pathname 指定package.json文件路径，默认寻找命令执行路径下的package.json
 * @returns
 */
async function increaseVersion(options = {}) {
    pkgPath =
        (isObject(options) && options.pathname) ||
        resolve(process.cwd(), "./pkg.json");
    pkgJson = require(pkgPath);
    currentV = pkgJson.version || "1.2.3";

    const v = await doAsk();

    if (isObject(options) && options.write) doWrite(v);

    return v;
}

export { increaseVersion };
