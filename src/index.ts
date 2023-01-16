// src/index.ts
import { App } from "vue";
import MyComponent from "./components/MyComponent/MyComponent.vue";
import Hello from "./components/Hello/Hello.vue";

const components = [MyComponent, Hello];
// 定义 install 函数类型
declare type PluginInstallFunction = (app: App, ...options: any[]) => any;

const install: PluginInstallFunction = (app: App) => {
    // 循环导入组件
    components.forEach((component) => {
        app.component(component.name, component);
    });
};

// 导出
export default {
    Hello,
    MyComponent,
    install,
};
