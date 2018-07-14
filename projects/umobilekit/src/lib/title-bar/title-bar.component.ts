import { Component, OnInit, Input } from '@angular/core'
import { PopStateEvent } from '@angular/common'
import { trigger, transition, style, animate, state } from '@angular/animations'

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({
                    opacity: 0
                }), //style only for transition transition (after transiton it removes)
                animate("300ms ease-out", style({
                    opacity: 1
                })) // the new state of the transition(after transiton it removes)
            ]),
            transition('* => void', [
                animate("300ms ease-in", style({
                    opacity: 0
                })) // the new state of the transition(after transiton it removes)
            ])
        ]),
        trigger('flyInOut', [
            transition('void => *', [
                style({
                    transform: 'translateX(-100%)'
                }),
                animate("300ms ease-out"),
            ]),
            transition('* => void', [
                animate("300ms ease-out",
                    style({
                        transform: 'translateX(-100%)'
                    })
                )
            ])
        ])            
    ]        

})
export class TitleBarComponent implements OnInit {

    @Input() title = ""
    @Input() withDrawer = false
    drawerOpen = false

    constructor() { }

    ngOnInit() { }

    onOpenDrawer() {
        this.drawerOpen = true
        history.pushState("drawer", null, '/drawer')
    }

    onPop(evt: PopStateEvent) {
        this.drawerOpen = false
    }
}
