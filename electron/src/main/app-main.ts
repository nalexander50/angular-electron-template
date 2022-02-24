import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const isDevelopment = process.env.ENV === 'development';

let mainWindow: BrowserWindow | null;

function createWindow(): BrowserWindow {
    const newWindow = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'electron-preload.js')
        }
    });

    newWindow.webContents.openDevTools();

    if (isDevelopment) {
        newWindow.loadURL('http://localhost:4200');
    } else {
        const searchPaths = [
            path.join(__dirname, 'index.html'),
            path.join(__dirname, '..', '..', 'dist', 'plex-collections-ui', 'index.html')
        ];

        for (const indexPath of searchPaths) {
            console.log(indexPath);
            if (fs.existsSync(indexPath)) {
                newWindow?.loadFile(indexPath);
                return newWindow;
            }
        }

        throw new Error('Failed to find index.html.');
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
