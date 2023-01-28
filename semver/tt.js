import { increaseVersion } from './index.js'
import { resolve, dirname } from "path";

// const v = await increaseVersion()

const v = await increaseVersion({ write: true })

// const v = await increaseVersion({
//     write: true,
//     pathname: new URL("./ppp.json", import.meta.url).pathname,
// });

// console.log(`v:`,v);