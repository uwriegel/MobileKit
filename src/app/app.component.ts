import { Component } from '@angular/core'
import { SetupService } from 'umobilekit'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    constructor(private setup: SetupService) {}
    
}

// TODO: <base href="./"> for Android!
// TODO: include iscroll.js 
// TODO: build scroll testapp, test iscroll