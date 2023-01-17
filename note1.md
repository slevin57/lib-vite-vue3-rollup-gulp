
加入gulp构建：

先全局安装：npm i -g gulp-cli  貌似项目中安装也可以，可以试试

再安装项目依赖，执行ts类型的配置文件所需依赖：yarn add gulp typescript gulp-typescript @types/gulp sucrase


`gulp` 默认执行当前目录下的`gulpfile.ts/js`配置文件
`gulp -f <config file path>` 运行指定的配置文件
`gulp --tasks` 查看任务列表



学习资料：
[珠峰架构-gulp应用实战\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1z34y1X77Z/?spm_id_from=333.337.search-card.all.click&vd_source=598ae9236ca9e4f496177fbb6bcb3065)