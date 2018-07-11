import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class SetupService {

    constructor() { 
        const sheet = document.createElement('style')
        sheet.innerHTML = 
    
    `:root {
        --mobilekit-color-header-background: #2196F3;
        --mobilekit-color-header: white;
    }
    
    body {
        font-family: sans-serif;
        padding: 0px;
        margin: 0px;
        overflow: hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
    } `;
    
        const stsh = document.styleSheets
        document.head.insertBefore(sheet, document.head.firstChild)        
    }
}
