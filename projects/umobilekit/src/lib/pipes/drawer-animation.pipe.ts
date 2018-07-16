import { Pipe, PipeTransform } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Pipe({
    name: 'drawerAnimation'
})
export class DrawerAnimationPipe implements PipeTransform {

    transform(setPoint: number): any {
        console.log("Pfeife", this.setPoint)
        if (this.setPoint != setPoint) {
            this.setPoint = setPoint
            setTimeout(() => {
                console.log("Gesetzt", setPoint)
                this.actualValue.next(this.setPoint)
            })
        }
        return this.actualValue
    }

    actualValue = new ReplaySubject<number>(1)
    private setPoint = 0
}
