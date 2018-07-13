import { Component, OnInit, Input } from '@angular/core'
import { PopStateEvent } from '../../../../../node_modules/@angular/common';

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() title = ""
    @Input() withDrawer = false
    drawerOpen = false

    constructor() { }

    ngOnInit() { }

    onOpenDrawer() {
        this.drawerOpen = true
        history.pushState("drawer", null, '/drawer')
    }

    onPop(evt: PopStateEvent) {
        this.drawerOpen = false
    }
}
