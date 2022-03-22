import { Component } from '@angular/core';
import { ElectronService } from './core/services/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-electron-template';

    constructor(private _electron: ElectronService) { }
}
