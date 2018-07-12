import { Component, OnInit } from '@angular/core'
import { SetupService } from 'umobilekit'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    ngOnInit() {
        this.items = [...Array(50)].map((_, i) => `Eintrag ${i}`)
    }

    items: string[]

    constructor(private setup: SetupService) {}
}

// TODO: <base href="./"> for Android!
// TODO: include iscroll.js 
// TODO: build scroll testapp, test iscroll