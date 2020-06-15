import React from 'react';
import webPlugin from '../webPlugin';
interface PluginAService {
    funcA: () => void
    funcB: () => void
}
declare global {
    interface WebPlugin {
        pluginA: PluginAService
    }
}
export default class extends React.Component {
    state = {
        text: 'pluginA'
    }
    componentDidMount() {
        webPlugin.pluginA.funcA = () => {
            this.setState({
                text: 'pluginA 插件化调用'
            });
        }
    }
    render() {
        return <div>
            {this.state.text}
        </div>
    }
}