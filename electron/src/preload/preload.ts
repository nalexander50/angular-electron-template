/* eslint-disable @typescript-eslint/no-explicit-any */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ElectronApi } from './electron-api.interface';

const validChannels = [
    'show-context-menu'
];
Object.freeze(validChannels);

const api: ElectronApi = {
    send: (channel: string, data?: any | undefined) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        } else {
            throw new Error('Invalid Channel');
        }
    },

    invoke: (channel: string, data?: any): Promise<any> => {
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data);
        } else {
            throw new Error('Invalid Channel');
        }
    },

    receive: (channel: string, handler: (event: IpcRendererEvent, ...args: any[]) => void) => {
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, handler);
        } else {
            throw new Error('Invalid Channel');
        }
    }
};

contextBridge.exposeInMainWorld('electron', api);

console.log('preload initialized');
