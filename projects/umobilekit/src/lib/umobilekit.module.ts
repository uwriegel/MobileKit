import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { ScrollerComponent } from './scroller/scroller.component'
import { ClickAnimationDirective } from './directives/click-animation.directive'

@NgModule({
    imports: [ 
        CommonModule,
        BrowserAnimationsModule
     ],
    declarations: [
        ScrollerComponent,
        ClickAnimationDirective, 
    ],
    exports: [
        ScrollerComponent,
        ClickAnimationDirective
    ],
    providers: [ ],

})
export class UmobilekitModule { }
