import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { UmobilekitComponent, SetupService } from 'umobilekit'

import { AppComponent } from './app.component'

@NgModule({
    declarations: [
        AppComponent,
        UmobilekitComponent,

    ],
    imports: [
        BrowserModule
    ],
    providers: [         
        SetupService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
