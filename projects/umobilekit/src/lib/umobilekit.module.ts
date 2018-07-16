import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { ScrollerComponent } from './scroller/scroller.component'
import { TitleBarComponent } from './title-bar/title-bar.component'
import { TitleButtonComponent } from './title-button/title-button.component'
import { MenuListComponent } from './svgs/menu-list/menu-list.component'
import { DrawerAnimationPipe } from './pipes/drawer-animation.pipe'

@NgModule({
    imports: [ 
        CommonModule,
        BrowserAnimationsModule
     ],
    declarations: [
        ScrollerComponent, 
        TitleBarComponent, 
        TitleButtonComponent, 
        MenuListComponent, 
        DrawerAnimationPipe
    ],
    exports: [
        ScrollerComponent,
        TitleBarComponent, 
        TitleButtonComponent
    ],
    providers: [ ],

})
export class UmobilekitModule { }
