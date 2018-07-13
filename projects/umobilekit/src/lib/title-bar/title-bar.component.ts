import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() title = ""

    constructor() { }

    ngOnInit() { }

}
