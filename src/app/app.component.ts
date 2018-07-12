import { Component, OnInit } from '@angular/core'
import { SetupService } from 'umobilekit'

declare class IScroll {
    constructor(wrapper: HTMLElement)
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    ngOnInit() {
        this.items = [...Array(50)].map((_, i) => `Eintrag ${i}`)
    }

    ngAfterViewInit() {
        const wrapper = document.getElementsByClassName("scroller")[0] as HTMLElement
        this.iscroll = new IScroll(wrapper)
    }

    items: string[]

    constructor(private setup: SetupService) {}

    private iscroll: any
}

// TODO: <base href="./"> for Android!
// TODO: include iscroll.js 
// TODO: build scroll testapp, test iscroll