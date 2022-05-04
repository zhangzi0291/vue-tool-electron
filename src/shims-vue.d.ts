import {App} from 'vue'
import {AxiosStatic} from "axios";
import {IpcRenderer} from "electron";

// typings.d.ts
declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $message: any,
        $icons: any,
        $modal: any,
        $message: any,
        $notification: any,
        $axios: AxiosStatic,
        $download: any,
    }
}

declare global {
    interface Window {
        vm: App;
        title: string;
        appText: string;
        BASE_URL: string;
        BASE_WS_URL: string;
        websocket: WebSocket;
        isDev: boolean;
        ipcRenderer:IpcRenderer;
    }

    interface Date {
        Format: Function<string>
    }
}

