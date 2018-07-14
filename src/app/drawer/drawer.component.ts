import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

    items: string[]

    constructor() { }

    ngOnInit() { 
        this.items = Array.from(Array(100).keys()).map((_, i) => `Eintrag ${i}`)
    }
}
