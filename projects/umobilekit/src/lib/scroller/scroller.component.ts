import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core'

declare class IScroll {
    constructor(wrapper: HTMLElement)
}

@Component({
    selector: 'mk-scroller',
    templateUrl: './scroller.component.html',
    styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements OnInit, AfterViewInit {

    @ViewChild("scroller")
    scroller: ElementRef

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.iscroll = new IScroll(this.scroller.nativeElement)
    }

    private iscroll: any
}
