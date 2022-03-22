import { IpcRendererEvent } from 'electron';

export interface ElectronApi {
    send: (channel: string, data?: any | undefined) => void;
    invoke: (channel: string, data?: any) => Promise<any>;
    receive: (channel: string, handler: (event: IpcRendererEvent, ...args: any[]) => void) => void;
}
