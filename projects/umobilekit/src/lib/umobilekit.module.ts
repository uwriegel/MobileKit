import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollerComponent } from './scroller/scroller.component'
import { TitleBarComponent } from './title-bar/title-bar.component'
import { TitleButtonComponent } from './title-button/title-button.component';
import { MenuListComponent } from './svgs/menu-list/menu-list.component'

@NgModule({
    imports: [ CommonModule ],
    declarations: [ScrollerComponent, TitleBarComponent, TitleButtonComponent, MenuListComponent],
    exports: [ScrollerComponent, TitleBarComponent, TitleButtonComponent],
    providers: [ ],

})
export class UmobilekitModule { }
