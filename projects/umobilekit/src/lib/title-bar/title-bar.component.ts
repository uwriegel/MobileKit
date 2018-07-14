import { Component, OnInit, Input } from '@angular/core'
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
                    opacity: 0.1
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
                    transform: 'translateX(-90%)'
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
            this.transitionMode = 'manual'
            this.drawerOpen = true
            evt.preventDefault()
            evt.stopPropagation()
        }
    }

    onTouchend(evt: TouchEvent) {
        this.transitionMode = 'automatic'
        this.drawerOpen = false
}
}
