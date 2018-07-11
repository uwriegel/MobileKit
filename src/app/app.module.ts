import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { SetupService } from 'umobilekit'

import { AppComponent } from './app.component'
import { UmobilekitModule } from 'projects/umobilekit/src/public_api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        UmobilekitModule
    ],
    providers: [         
        SetupService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
