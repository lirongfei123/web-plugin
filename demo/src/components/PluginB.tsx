import React from 'react';
import webPlugin from '../webPlugin';
interface PluginBService {
    funcA: () => void
    emitEvent_A: (params: string) => void
    onEvent_A: (callback: (params: string) => void) => void
}
declare global {
    interface WebPlugin {
        pluginB: PluginBService
    }
}
export default class extends React.Component {
    state = {
        text: 'pluginB'
    }
    componentDidMount() {
        webPlugin.pluginB.funcA = () => {
            this.setState({
                text: 'pluginB 插件化调用'
            });
            webPlugin.pluginB.emitEvent_A('B事件触发');
        }
    }
    render() {
        return <div>
            {this.state.text}
        </div>
    }
}