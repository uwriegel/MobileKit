import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { ScrollerComponent } from './scroller/scroller.component'

@NgModule({
    imports: [ 
        CommonModule,
        BrowserAnimationsModule
     ],
    declarations: [
        ScrollerComponent, 
    ],
    exports: [
        ScrollerComponent,
    ],
    providers: [ ],

})
export class UmobilekitModule { }
