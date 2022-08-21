'use strict'

import {app, BrowserWindow, Menu, protocol, Tray} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import * as path from "path";
import IPC from "./ipc";

const isDevelopment = process.env.NODE_ENV !== 'production'
const windonWidth = 1280
const windonHeight = 720

let win: BrowserWindow
let tray: Tray

const template = [
    {
        label: '菜单',
        submenu: [{
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: '控制台',
            accelerator: 'F12',
            key: 'console',
            role: 'toggledevtools'
        }]
    }
]

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: windonWidth,
        height: windonHeight,
        frame: false,
        // titleBarStyle: 'hidden',
        // titleBarOverlay: {
        //     color: '#2f3241',
        //     symbolColor: '#74b1be'
        // },
        show: true,
        //icon:nativeImage.createFromPath(path.join(__dirname, "../public/preview.png")),
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, //允许子进程调用主进程的api
            nativeWindowOpen:true,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    console.log(process.env.WEBPACK_DEV_SERVER_URL)
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
        win.webContents.openDevTools();
    } else {
        // Load the index.html when not in development
        createProtocol('app')
        win.loadURL('app://./index.html')
    }

    win.webContents.once('dom-ready', () => {
        console.log("dom-ready")
        win.show()
    })

    win.on('closed', () => {
        console.log("onclosed")
        // win.close();
    });

    win.on('close', (event:any) => {
        // 截获 close 默认行为
        event.preventDefault();
        // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
        win.hide();
        win.setSkipTaskbar(true);
    });

    // 新建托盘
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        tray = new Tray(path.join(__dirname, '../public/logo.ico'));
    }else{
        tray = new Tray(path.join(__dirname, './logo.ico'));
    }
    // 托盘名称
    tray.setToolTip("VUE工具箱");
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([
        {label: '显示', click: () => win.show()},
        {label: '退出', click: () => { win.destroy() }}
    ]);
    // // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 双击触发
    tray.on('double-click', () => {
        // 双击通知区图标实现应用的显示或隐藏
        win.isVisible() ? win.hide() : win.show()
        win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    console.log("closed")
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//限制只能开启一个应用(4.0以上版本)
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
 app.quit()
} else {
 app.on('second-instance', (event, commandLine, workingDirectory) => {
   // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
   if (win) {
     if (win.isMinimized()) win.restore()
     win.focus()
     win.show()
   }
 })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //   // Install Vue Devtools
    //   try {
    //     await installExtension(VUEJS3_DEVTOOLS)
    //   } catch (e) {
    //     console.error('Vue Devtools failed to install:', e.toString())
    //   }
    // }
    createWindow()

    IPC.initIPC(win)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}



