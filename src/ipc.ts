import {app, BrowserWindow, ipcMain} from "electron";

export default class IPC{
    static  initIPC(win:BrowserWindow){
        ipcMain.on('close-on-desktop', (event, message) => {
            win.close()
        })
        ipcMain.on('close-window', (event, message) => {
            console.log("quit")
            app.exit()
        })
        ipcMain.on('minimizing-window', (event, message) => {
            win.minimize()
        })
    }
}