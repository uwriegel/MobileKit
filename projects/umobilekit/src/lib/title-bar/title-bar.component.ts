import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { PopStateEvent } from '@angular/common'
import { ScrollerComponent } from '../scroller/scroller.component'
import { Subject, ReplaySubject } from 'rxjs'

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() title = ""
    @Input() withDrawer = false

    drawerPosition = new ReplaySubject<number>(1)

    constructor() { }

    ngOnInit() { }

    onOpenDrawer() {
        this.drawerPosition.next(1)
        setTimeout(n => ScrollerComponent.scrollers.forEach(n => n.refresh()))
        history.pushState("drawer", null, '/drawer')
    }

    onPop(evt: PopStateEvent) {
        this.drawerPosition.next(0)
    }

    onTouchstart(evt: TouchEvent) {
        if (evt.touches.length == 1 &&  evt.touches[0].clientX < 15) {

            const width = window.document.body.clientWidth
            console.log("Weit", width)
            const drawerWidth = width * 79 / 100
            console.log("drawerWidth", drawerWidth)

            this.drawerPosition.next(0.05)
            const initialX = evt.touches[0].clientX
            const initialY = evt.touches[0].clientY

            let drawerOffset = -1 

            const touchmove = (evt: TouchEvent) => {
                if (drawerOffset == -1) {

                    // drawer is initially 5% visible: drawerWidth * 5 / 100
                    const initial = drawerWidth * 5 / 100
                    drawerOffset = initial - evt.touches[0].clientX

                    const diffx = evt.touches[0].clientX - initialX
                    const diffy = evt.touches[0].clientY - initialY
                    const ratio = diffx / diffy 
                    if (Math.abs(ratio) < 2) {
                        window.removeEventListener('touchmove', touchmove, true)
                        window.removeEventListener('touchend', touchend, true)
                        this.drawerPosition.next(0)
                        evt.preventDefault()
                        evt.stopPropagation()
                        return
                    }
                }

                let position = (evt.touches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100
                console.log("Position", position)
                this.drawerPosition.next(position / 100)

                evt.preventDefault()
                evt.stopPropagation()
            }

            const touchend = (evt: TouchEvent) => {
                window.removeEventListener('touchmove', touchmove, true)
                window.removeEventListener('touchend', touchend, true)
                this.drawerPosition.next(0)
                evt.preventDefault()
                evt.stopPropagation()
            }                
            window.addEventListener('touchmove', touchmove, true)
            window.addEventListener('touchend', touchend, true)

            evt.preventDefault()
            evt.stopPropagation()
        }
    }
}
