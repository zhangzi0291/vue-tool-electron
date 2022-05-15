import {app, BrowserWindow, ipcMain} from "electron";

export default class IPC{
    static  initIPC(win:BrowserWindow){
        ipcMain.on('close-window', (event, message) => {
            win.close()
        })

        ipcMain.on('minimizing-window', (event, message) => {
            win.minimize()
        })
    }
}