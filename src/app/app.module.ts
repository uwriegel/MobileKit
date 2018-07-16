import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { UmobilekitModule } from 'projects/umobilekit/src/public_api'
import { DrawerComponent } from './drawer/drawer.component'

@NgModule({
    declarations: [
        AppComponent,
        DrawerComponent
    ],
    imports: [
        BrowserModule,
        UmobilekitModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
