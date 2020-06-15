import createWebPlugin from './bundle.js';
declare global {
    interface WebPlugin {
    }
}
const webPlugin: WebPlugin =  createWebPlugin({});
export default webPlugin;