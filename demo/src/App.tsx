import React, {useEffect} from 'react';
import logo from './logo.svg';
import webPlugin from './webPlugin';
import './App.css';
import PluginA from './components/PluginA';
import PluginB from './components/PluginB';
function App() {
  useEffect(() => {
    webPlugin.pluginB.onEvent_A((str: string) => {
      console.log(str);
    });
  }, []);
  return (
    <div className="App">
      <PluginA />
      <PluginB />
      <div><button onClick={ () => {
        webPlugin.pluginA.funcA();
      }}>调用插件A</button></div>
      <div><button onClick={ () => {
        webPlugin.pluginB.funcA();
      }}>调用插件B</button></div>
    </div>
  );
}

export default App;
