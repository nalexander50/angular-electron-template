import { app, BrowserWindow, ipcMain, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

import { createDefaultTemplate } from './menu-template';

const isDevelopment = process.env.ENV === 'development';

let mainWindow: BrowserWindow | null;
let indexPath: string | undefined;

// === Window Functions ===

function createWindow(): BrowserWindow {
    const newWindow = new BrowserWindow({
        title: '',
        width: 500,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'electron-preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            devTools: isDevelopment
        }
    });

    registerWindowEvents(newWindow);

    if (isDevelopment) {
        newWindow.loadURL('http://localhost:4200');
        newWindow.webContents.openDevTools();
    } else {
        const searchPaths = [
            path.join(__dirname, 'index.html'),
            path.join(__dirname, '..', '..', 'dist', 'angular-electron-template', 'index.html')
        ];

        for (const path of searchPaths) {
            if (fs.existsSync(path)) {
                indexPath = path;
                break;
            }
        }

        if (!indexPath) {
            throw new Error('Failed to find index.html.');
        }

        Menu.setApplicationMenu(Menu.buildFromTemplate(createDefaultTemplate(app.name, isDevelopment) as MenuItemConstructorOptions[]));
        newWindow.loadFile(indexPath);
    }

    return newWindow;
}

function registerWindowEvents(window: BrowserWindow) {
    window.on('closed', () => {
        mainWindow = null;
    });
}

// === app Events ===

app.on('ready', () => {
    if (!mainWindow) {
        mainWindow = createWindow();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createWindow();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});

// === ipcMain Events ===

ipcMain.on('show-context-menu', (event, location: { x: number, y: number }) => {
    const contextMenu = new Menu();

    if (isDevelopment) {
        const inspectElement = new MenuItem({
            label: 'Inspect Element',
            click: () => {
                mainWindow.webContents.inspectElement(location.x, location.y);
            }
        });
        contextMenu.append(inspectElement);
    }

    contextMenu.popup({
        window: BrowserWindow.fromWebContents(event.sender)
    });
});
