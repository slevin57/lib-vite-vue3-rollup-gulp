import { spawn } from "child_process";
import path from "path";
import { series, parallel } from "gulp";

const projectRoot = path.resolve(__dirname);

export const withTaskName = (name: string, fn) =>
    Object.assign(fn, { displayName: name });

export const run = async (command: string, dirname?: string) => {
    return new Promise((resolve) => {
        const [cmd, ...args] = command.split(" ");
        console.log(`args:`, args);
        const app = spawn(cmd, args, {
            cwd: dirname || projectRoot,
            stdio: "inherit",
            shell: true,
        });
        app.on("close", resolve);
    });
};

async function build() {
    run("yarn build-lib:all");
}

const clean = parallel(
    withTaskName("clean1", async () => run("rm -rf __lib-vite")),
    withTaskName("clean2", async () => run("rm -rf __lib-file")),
    withTaskName("clean3", async () => run("rm -rf __lib-api"))
);
const buildall = parallel(
    withTaskName("build1", async () => run("yarn build-lib:vite")),
    withTaskName("build2", async () => run("yarn build-lib:file")),
    withTaskName("build3", async () => run("yarn build-lib:api"))
);
export default series(
    clean,
    // build,
    buildall
);
