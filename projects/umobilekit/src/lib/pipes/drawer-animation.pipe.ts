import { Pipe, PipeTransform } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Pipe({
    name: 'drawerAnimation'
})
export class DrawerAnimationPipe implements PipeTransform {

    // TODO: Easing function 
    // TODO: Scroller in drawer not scrolling
    // TODO: left click when opened opens again: supress
    // TODO: when > 1/2 of distance and release touch: endpoint must be 1
    // TODO: fling
    transform(setPoint: number): any {

        if (this.setPoint != setPoint) {
            let previousSetPoint = this.setPoint
            this.setPoint = setPoint
            let previousTimestamp = 0

            let position = this.setPoint - previousSetPoint

            const animate = (timestamp: number) => {
                if (previousTimestamp) {
                    const timeDiff = timestamp - previousTimestamp
                    const max = Math.abs(position)
                    let ratio = timeDiff / (300 * max)
                    if (ratio > 1)
                        ratio = 1
                    if (ratio <= 1) {
                        this.actualValue.next(previousSetPoint  + (position * ratio))
                        if (ratio < 1) 
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
