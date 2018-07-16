import { Pipe, PipeTransform } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Pipe({
    name: 'drawerAnimation'
})
export class DrawerAnimationPipe implements PipeTransform {

    // TODO: start value (is mot 0!!!)
    // when back, then start value = 1!
    // or when manual moving, start value is current value!
    transform(setPoint: number): any {

        if (this.setPoint != setPoint) {
            this.setPoint = setPoint
            let previousTimestamp = 0
            const animate = (timestamp: number) => {
                if (previousTimestamp) {
                    const timeDiff = timestamp - previousTimestamp
                    let ratio = timeDiff / 300
                    if (ratio > 1)
                        ratio = 1
                    if (ratio <= 1) {
                        this.actualValue.next(this.setPoint * ratio)
                        requestAnimationFrame(animate)
                    }
                }
                else {
                    previousTimestamp = timestamp
                    requestAnimationFrame(animate)
                }
            }
        
            requestAnimationFrame(animate)
        }
        return this.actualValue
    }

    actualValue = new ReplaySubject<number>(1)
    private setPoint = 0
}
