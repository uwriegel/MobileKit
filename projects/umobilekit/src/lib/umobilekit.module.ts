import { NgModule } from '@angular/core'
import { ScrollerComponent } from './scroller/scroller.component'
import { SetupService } from './setup.service'

@NgModule({
    imports: [ ],
    declarations: [ScrollerComponent],
    exports: [ScrollerComponent],
    providers: [ SetupService ],

})
export class UmobilekitModule { }
