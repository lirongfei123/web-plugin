class DefaultObject extends Function {
    __call__() {
        console.warn('当前服务还未准备好, 请稍后再调用');
    }
}
const webPluginHandler = {
    get: (obj, prop) => {
        if (!obj[prop]) {
            // 检查是否是event函数
            if (typeof prop === 'string' && prop.indexOf('onEvent_') > -1) {
                let event = prop.split('_')[1];
                if (!obj['__EVENTS__']) {
                    obj['__EVENTS__'] = {};
                }
                obj[prop] = (func) => {
                    var currentEvents = obj['__EVENTS__'][event];
                    if (!currentEvents) {
                        currentEvents = obj['__EVENTS__'][event] = [];
                    }
                    // 检查是否存在event
                    if (!currentEvents.find(item => item === func)) {
                        currentEvents.push(func);
                    }
                    return () => {
                        obj['__EVENTS__'][event] = currentEvents.filter(item => item !== func);
                    }
                };
            } else if (typeof prop === 'string' && prop.indexOf('emitEvent_') > -1) {
                let event1 = prop.split('_')[1];
                if (!obj['__EVENTS__']) {
                    obj['__EVENTS__'] = {};
                }
                obj[prop] = (...args) => {
                    var currentEvents = obj['__EVENTS__'][event1];
                    if (!currentEvents) {
                        currentEvents = obj['__EVENTS__'][event1] = [];
                    }
                    // 检查是否存在event
                    currentEvents.forEach(func => {
                        try {
                            func(...args);
                        } catch (e) {
                            console.error(`${prop}事件回调出错`, e);
                        }
                    });
                };
            } else if (typeof prop === 'string' && prop.indexOf('removeEvent_') > -1) {
                let event2 = prop.split('_')[1];
                if (!obj['__EVENTS__']) {
                    obj['__EVENTS__'] = {};
                }
                obj[prop] = (func) => {
                    var currentEvents = obj['__EVENTS__'][event2];
                    if (!currentEvents) {
                        currentEvents = obj['__EVENTS__'][event2] = [];
                    }
                    obj['__EVENTS__'][event2] = currentEvents.filter(item => item !== func);
                };
            } else {
                // 可以让默认值, 可以被调用, 免得报错
                obj[prop] = new Proxy(new DefaultObject(), webPluginHandler);
            }
        }
        return obj[prop];
    },
    set: (obj, prop, target) => {
        if (obj[prop] && Object.prototype.toString.call(target) === '[object Object]') {
            const oldTarget = obj[prop];
            const oldName = Object.keys(oldTarget);
            try {
                oldName.forEach((oldKey) => {
                    if (!target[oldKey]) {
                        target[oldKey] = oldTarget[oldKey];
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
        if (Object.prototype.toString.call(target) === '[object Object]') {
            target = new Proxy(target, webPluginHandler);
        }
        return Reflect.set(obj, prop, target);
    }
}

export default function (obj) {
    return new Proxy(obj, webPluginHandler);
};
    