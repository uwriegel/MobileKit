import { NgModule } from '@angular/core'
import { ScrollerComponent } from './scroller/scroller.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleButtonComponent } from './title-button/title-button.component'

@NgModule({
    imports: [ ],
    declarations: [ScrollerComponent, TitleBarComponent, TitleButtonComponent],
    exports: [ScrollerComponent, TitleBarComponent, TitleButtonComponent],
    providers: [ ],

})
export class UmobilekitModule { }
