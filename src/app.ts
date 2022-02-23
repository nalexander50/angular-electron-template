import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const isDevelopment = !app.isPackaged;

if (isDevelopment) {
    try {
        require('electron-reload')(path.join(__dirname, '..'));
    } catch {
        // swallow -- development only
    }
}

let mainWindow: BrowserWindow | null;

function createWindow(): BrowserWindow {
    const newWindow = new BrowserWindow({
        width: 500,
        height: 500
    });

    if (isDevelopment) {
        newWindow.loadURL('http://localhost:4200');
        newWindow.webContents.openDevTools();
    } else {
        newWindow.loadFile(path.join(__dirname, 'web', 'index.html'));
    }

    newWindow.on('closed', () => {
        mainWindow = null;
    });

    newWindow.webContents.on('devtools-opened', () => {
        newWindow.focus();
        setImmediate(() => {
            newWindow.focus();
        });
    });

    return newWindow;
}

app.on('ready', () => {
    if (!mainWindow) {
        mainWindow = createWindow();
    }
});

app.on('activate', () => {
    mainWindow = createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
