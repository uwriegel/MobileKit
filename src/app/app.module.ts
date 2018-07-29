import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { UmobilekitModule } from 'projects/umobilekit/src/public_api'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        UmobilekitModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
