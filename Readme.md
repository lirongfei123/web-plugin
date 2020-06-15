# 安装
npm install create-web-plugin --save

# 使用
## src/pluginService.js
import createPlugin from 'create-web-plugin';
export default createPlugin({});

## other any file
import webPlugin from 'src/pluginService';

webPlugin.serviceA.serivceB.serviceC.funcA = {};

# 特点
## 上述的serviceA，serviceB，serviceC，是可以无线写的，没有会自动创建
webPlugin.serviceA.serivceB.serviceC.funcA = {};
webPlugin.serviceA.serivceD.funcA = {};
## 对任何旧的service，重新赋值，不会完全覆盖，而且合并覆盖
### 例子
webPlugin.serviceA = {
    funcA: () => {},
    funcB: () => {},
    funcC: () => {},
}

在其他地方再次赋值

webPlugin.serviceA = {
    funcB: () => {},
    funcC: () => {},
    funcD: () => {},
}

这里赋值并不会将funcA 删除，而是覆盖funcB, funcC, 新加funcD

## 事件系统
触发事件是以emitEvent_ 开头

监听事件是以onEvent_ 开头
### 触发事件
webPlugin.serviceA.serivceB.emitEvent_事件A('参数');

### 监听时间
webPlugin.serviceA.serivceB.onEvent_事件A(() => {

});

# 最大的亮点
可以通过编写typescript type文件，来实现提示功能

详细见demo