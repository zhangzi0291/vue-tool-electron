'use strict'

import {app, protocol, BrowserWindow, nativeImage, Menu, shell, ipcMain} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'

import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import * as path from "path";

const isDevelopment = process.env.NODE_ENV !== 'production'
const windonWidth = 1280
const windonHeight = 880

let win: any = null
let loading: any = null
const template = [
    {
        label: '菜单1',
        submenu: [{
            label: '帮助文档',
            click: function () {
                shell.openExternal('https://www.jianshu.com/u/1699a0673cfe')
            }
        }]
    },
    {
        label: '菜单2',
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
    console.log(process.env.ELECTRON_NODE_INTEGRATION)
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
        win.webContents.openDevTools();
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.webContents.once('dom-ready', () => {
        console.log("dom-ready")
        win.show()
    })

}

async function loadingWindow() {
    loading = new BrowserWindow({
        width: windonWidth,
        height: windonHeight,
        frame: false,
        backgroundColor: '#222',
        skipTaskbar: true,
        transparent: true,
        resizable: false,
        webPreferences: {experimentalFeatures: true}
    })
    const loadingURL = process.env.NODE_ENV !== 'production' ? `${process.env.WEBPACK_DEV_SERVER_URL}/loader.html` : `app://./loader.html`

    loading.loadURL(loadingURL)

    loading.show()

    setTimeout(() => {
        createWindow().then(() => {
            loading.close()
        })
    }, 7 * 1000)

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

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
    // createWindow()
    loadingWindow()
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

