import { Component, OnInit, Input } from '@angular/core'
import { PopStateEvent } from '@angular/common'
import { ScrollerComponent } from '../scroller/scroller.component'

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() title = ""
    @Input() withDrawer = false

    get drawerPosition() { return this._drawerPosition}
    set drawerPosition(value: number) {
        this._drawerPosition = value
        this.transform(value)
    }
    _drawerPosition = 0
    actualDrawerPosition = 0

    constructor() { }

    ngOnInit() { }

    onOpenDrawer() {
        this.drawerPosition = 1
        history.pushState("drawer", null, '/drawer')
    }

    onPop(evt: PopStateEvent) {
        this.drawerPosition = 0
    }
    
    onTouchstart(evt: TouchEvent, isOpen: boolean) {
        if ( (!isOpen && evt.touches.length == 1 && evt.touches[0].clientX < 15 &&  evt.touches[0].clientY > 55)
            || isOpen) {
            const width = window.document.body.clientWidth
            const drawerWidth = width * 79 / 100

            if (!isOpen) 
                this.drawerPosition = 0.05
            else
                this.drawerPosition = 1
            const initialX = evt.touches[0].clientX
            const initialY = evt.touches[0].clientY

            let drawerOffset = -1 
            let diffDistance = 0
            let diffTime = 0
            let recentX = 0
            let recentTimestamp = 0

            const touchmove = (evt: TouchEvent) => {
                if (drawerOffset == -1) {

                    // drawer is initially 5% visible: drawerWidth * 5 / 100
                    const initial = !isOpen ? drawerWidth * 5 / 100 : drawerWidth
                    drawerOffset = initial - evt.touches[0].clientX

                    const diffx = evt.touches[0].clientX - initialX
                    const diffy = evt.touches[0].clientY - initialY

                    const ratio = diffx / diffy 
                    if (Math.abs(ratio) < 2) {
                        window.removeEventListener('touchmove', touchmove, true)
                        window.removeEventListener('touchend', touchend, true)
                        if (!isOpen)
                            this.drawerPosition = 0
                        evt.preventDefault()
                        evt.stopPropagation()
                        return
                    }
                }

                recentX = evt.touches[0].clientX
                recentTimestamp = evt.timeStamp

                let position = (evt.touches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100
                this.drawerPosition = position / 100

                evt.preventDefault()
                evt.stopPropagation()
            }

            const touchend = (evt: TouchEvent) => {

                window.removeEventListener('touchmove', touchmove, true)
                window.removeEventListener('touchend', touchend, true)

                let position = (evt.changedTouches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100
                this.drawerPosition = position / 100

                diffDistance = (evt.changedTouches[0].clientX - recentX) / drawerWidth * 100
                diffTime = evt.timeStamp - recentTimestamp
                const fling = diffDistance / diffTime
                console.log("Fling", fling)                
                if (fling > 0.1) {
                    const animate = (timestamp: number) => {
                        console.log("Mal sehen", timestamp)
                        diffTime = timestamp - recentTimestamp
                        recentTimestamp = timestamp
                        this.drawerPosition = fling * diffTime 
                        if (this.drawerPosition > 1)
                            this.drawerPosition = 1
                        else
                            requestAnimationFrame(animate)
                    }
                    requestAnimationFrame(animate)
                    console.log("Mal sehen?", evt.timeStamp)
                }
                else {

                    if (this.drawerPosition >= 0.5) {
                        this.drawerPosition = 1
                        if (!isOpen)
                            history.pushState("drawer", null, '/drawer')
                    }
                    else {
                        this.drawerPosition = 0
                        if (isOpen) 
                            history.back()
                    }
                }

                evt.preventDefault()
                evt.stopPropagation()
            }                
            window.addEventListener('touchmove', touchmove, true)
            window.addEventListener('touchend', touchend, true)

            evt.preventDefault()
            evt.stopPropagation()
        }
    }

    private transform(setPoint: number): any {

        if (this.setPoint != setPoint) {
            let previousSetPoint = this.setPoint
            this.setPoint = setPoint
            let previousTimestamp = 0

            let position = this.setPoint - previousSetPoint

            const ease = x => x*(2-x)
            const duration = 300

            const animate = (timestamp: number) => {
                if (previousTimestamp) {
                    const timeDiff = timestamp - previousTimestamp
                    const max = Math.abs(position)
                    let ratio = timeDiff / (duration * max)
                    if (ratio > 1)
                        ratio = 1
                    if (ratio <= 1) {
                        this.actualDrawerPosition = previousSetPoint  + (position * ease(ratio))
                        if (ratio < 1) 
                            requestAnimationFrame(animate)
                    }
                }
                else {
                    setTimeout(n => ScrollerComponent.refresh(), 100)
                    previousTimestamp = timestamp
                    requestAnimationFrame(animate)
                }
            }
        
            requestAnimationFrame(animate)
        }
    }

    private setPoint = 0
}
