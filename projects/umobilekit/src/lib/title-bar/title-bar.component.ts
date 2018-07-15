import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { PopStateEvent } from '@angular/common'
import { trigger, transition, style, animate, state } from '@angular/animations'
import { ScrollerComponent } from '../scroller/scroller.component';

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css'],
    animations: [
        trigger('shader', [
            state("manual", 
                style({
                    opacity: 0.05
                })),
            state("automatic", 
                style({
                    opacity: 1
                })),
            transition('void => manual', [
                style({
                    opacity: 0
                }),
                animate("150ms"),
            ]),
            transition('void => automatic', [
                style({
                    opacity: 0
                }),
                animate("300ms ease-out"),
            ]),
            transition('automatic => void', [
                animate("300ms ease-out",
                style({
                    opacity: 0
                }))            
            ]),
            transition('manual => void', [
                animate("150ms ease-out",
                style({
                    opacity: 0
                }))            
            ]),
        ]),            
        trigger('transitionMode', [
            state("manual", 
                style({
                    transform: 'translateX(-95%)'
                })),
            state("automatic", 
                style({
                    transform: 'translateX(0%)'
                })),
            transition('void => manual', [
                style({
                    transform: 'translateX(-100%)'
                }),
                animate("150ms"),
            ]),
            transition('void => automatic', [
                style({
                    transform: 'translateX(-100%)'
                }),
                animate("300ms ease-out"),
            ]),
            transition('automatic => void', [
                animate("300ms ease-out",
                style({
                    transform: 'translateX(-100%)'
                }))            
            ]),
            transition('manual => void', [
                animate("150ms ease-out",
                style({
                    transform: 'translateX(-100%)'
                }))            
            ]),
        ])            
    ]        

})
export class TitleBarComponent implements OnInit {

    @Input() title = ""
    @Input() withDrawer = false
    drawerOpen = false
    transitionMode = 'automatic'

    constructor() { }

    ngOnInit() { }

    onOpenDrawer() {
        this.drawerOpen = true
        setTimeout(n => ScrollerComponent.scrollers.forEach(n => n.refresh()))
        history.pushState("drawer", null, '/drawer')
    }

    onPop(evt: PopStateEvent) {
        this.drawerOpen = false
    }

    onTouchstart(evt: TouchEvent) {
        if (evt.touches.length == 1 &&  evt.touches[0].clientX < 15) {

            const width = window.document.body.clientWidth
            console.log("Weit", width)
            const drawerWidth = width * 79 / 100
            console.log("drawerWidth", drawerWidth)

            this.transitionMode = 'manual'
            this.drawerOpen = true
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
                        this.transitionMode = 'automatic'
                        this.drawerOpen = false
                        evt.preventDefault()
                        evt.stopPropagation()
                        return
                    }
                }

                let position = (evt.touches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100
                console.log("Position", position)
                const drawer = document.getElementsByClassName("drawer")[0] as HTMLElement
                drawer.style.transform = `translateX(${(position - 100)}%)`
                const shader = document.getElementsByClassName("shader")[0] as HTMLElement
                shader.style.opacity = `${(position / 100)}`

                evt.preventDefault()
                evt.stopPropagation()
            }

            const touchend = (evt: TouchEvent) => {
                window.removeEventListener('touchmove', touchmove, true)
                window.removeEventListener('touchend', touchend, true)
                this.transitionMode = 'automatic'
                this.drawerOpen = false
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
