import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ElectronService {

    constructor() {
        document.addEventListener('dragover', event => event.preventDefault());
        document.addEventListener('drop', event => event.preventDefault());

        window.addEventListener('contextmenu', menuEvent => {
            menuEvent.preventDefault();
            window.electron.send('show-context-menu', { x: menuEvent.clientX, y: menuEvent.clientY });
        });
    }
}
