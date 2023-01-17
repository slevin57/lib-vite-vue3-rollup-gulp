const { series } = require("gulp");

function minify(cb) {
    // body omitted
    cb();
}

function transpile(cb) {
    // body omitted
    cb();
}

function livereload(cb) {
    // body omitted
    cb();
}


export default async function (done){
    console.log(`11:`,11);
    // done()
    return function(){
        console.log(`22:`,22);
    }
}