import {App} from 'vue';


const install = function install(app: App) {

    app.config.globalProperties.$ipcRenderer = window.ipcRenderer

};


const _default = {
    version: 1,
    install: install
};

export default _default;