import { Component, OnInit } from '@angular/core'

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

    constructor() {}
}

