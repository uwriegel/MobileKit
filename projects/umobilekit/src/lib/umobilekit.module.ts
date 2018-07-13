import { NgModule } from '@angular/core'
import { ScrollerComponent } from './scroller/scroller.component';
import { TitleBarComponent } from './title-bar/title-bar.component'

@NgModule({
    imports: [ ],
    declarations: [ScrollerComponent, TitleBarComponent],
    exports: [ScrollerComponent, TitleBarComponent],
    providers: [ ],

})
export class UmobilekitModule { }
