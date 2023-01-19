import semver from "semver";
import inquirer from "inquirer";
import pkg from "./package.json" assert { type: "json" };

/**
 * 通过参数直接自定义
 * 手动选择
 * 没有选项，自定义输入
 */

const currentV = pkg.version || '1.2.3'
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

async function changeVersion() {
    let version = ''
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "autoVersion",
            loop: true,
            message: `当前版本是${currentV},选择要升级的版本号：`,
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
                const isVersionLeaal =
                    semver.valid(answer) && semver.gt(answer, currentV);
                const errMsg = "版本号格式错误，重新输入";
                return isVersionLeaal || errMsg;
            },
        },
        {
            type: "confirm",
            name: "confirm",
            message(hash) {
                version = hash.autoVersion || hash.manualVersion;
                return `确认要升级的版本号：${version}，需要重新生成的话输入"n/N"`;
            },
        },
    ]);

    if (!answers.confirm) {
        console.log(`answers1:`,answers);
        console.log(`version:`,version);
        await changeVersion();
    }
    console.log(`answers2:`,answers);
    console.log(`version:`, version);
    return version;
    console.log(`11:`,11);
}
console.log(`22:`,22);
targetV = await changeVersion()
console.log(`3333:`,3333);
console.log(`targetV:`,targetV);