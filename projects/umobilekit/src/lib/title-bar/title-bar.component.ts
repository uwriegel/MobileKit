import { Component, Input } from '@angular/core'
import { PopStateEvent } from '@angular/common'
import { trigger, transition, style, animate, state } from '@angular/animations'
import { ScrollerComponent } from '../scroller/scroller.component'

@Component({
    selector: 'mk-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css'],
    animations: [
        trigger('shader', [
            state("void", style({ opacity: '{{opacityClosed}}' }),
            {
                params: {opacityClosed: 0 }
            }),
            state("open", style({ opacity: '{{opacityOpened}}' }),          
            {
                params: {opacityOpened: 1 }
            }),
            state("transition", style({ opacity: '{{opacityTransition}}' }),          
            {
                params: {opacityTransition: 1 }
            }),
            transition('void => *', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
            transition('* => void', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
            transition('* => transition', animate("0ms ease-out")),
            transition('transition => open', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
        ]),            
        trigger('transitionMode', [
            state("void", style({ transform: 'translateX(-{{offsetClosed}}%)' }),
            {
                params: {offsetClosed: 100 }
            }),
            state("open", style({ transform: 'translateX(-{{offsetOpened}}%)' }),          
            {
                params: {offsetOpened: 0 }
            }),
            state("transition", style({ transform: 'translateX(-{{offsetTransition}}%)' }),          
            {
                params: {offsetTransition: 0 }
            }),
            transition('void => *', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
            transition('* => void', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
            transition('* => transition', animate("0ms ease-out")),
            transition('transition => open', animate("{{duration}}ms ease-out"), { params: { duration: 300}}),
        ])            
    ]            
})
export class TitleBarComponent {

    @Input() title = ""
    @Input() withDrawer = false
    offsetClosed = 100
    offsetOpened = 0
    offsetTransition = 0
    
    opacityClosed = 0
    opacityOpened = 1
    opacityTransition = 1
    
    transitionState = 'open'

    // TODO: click on drawer closes it
    // TODO: History when manually touched to close
    // TODO: adapt durations
    // TODO: fling
    drawerOpen = false

    constructor() {}

    onOpenDrawer() {
        this.offsetClosed = 100
        this.offsetOpened = 0
        this.opacityClosed = 0
        this.opacityOpened = 1
        this.transitionState = 'open'
        this.drawerOpen = true
        setTimeout(n => ScrollerComponent.refresh())
        history.pushState("drawer", null, '/drawer')  
    }

    onPop(evt: PopStateEvent) {
        this.offsetClosed = 100
        this.offsetOpened = 0
        this.opacityClosed = 0
        this.opacityOpened = 1
        this.transitionState = 'open'
        setTimeout(() => this.drawerOpen = false)
    }
    
    //onTouchstart(evt: TouchEvent, isOpen: boolean) {
        // if ( (!isOpen && evt.touches.length == 1 && evt.touches[0].clientX < 15 &&  evt.touches[0].clientY > 55)
        //     || isOpen) {
        //     const width = window.document.body.clientWidth
        //     const drawerWidth = width * 79 / 100
        //     if (!isOpen) 
        //         this.drawerPosition = 0.05
        //     else
        //         this.drawerPosition = 1
        //     const initialX = evt.touches[0].clientX
        //     const initialY = evt.touches[0].clientY
        //     let drawerOffset = -1 
        //     let diffDistance = 0
        //     let diffTime = 0
        //     let recentX = 0
        //     let recentTimestamp = 0
        //     const touchmove = (evt: TouchEvent) => {
        //         if (drawerOffset == -1) {
        //             // drawer is initially 5% visible: drawerWidth * 5 / 100
        //             const initial = !isOpen ? drawerWidth * 5 / 100 : drawerWidth
        //             drawerOffset = initial - evt.touches[0].clientX
        //             const diffx = evt.touches[0].clientX - initialX
        //             const diffy = evt.touches[0].clientY - initialY
        //             const ratio = diffx / diffy 
        //             if (Math.abs(ratio) < 2) {
        //                 window.removeEventListener('touchmove', touchmove, true)
        //                 window.removeEventListener('touchend', touchend, true)
        //                 if (!isOpen)
        //                     this.drawerPosition = 0
        //                 evt.preventDefault()
        //                 evt.stopPropagation()
        //                 return
        //             }
        //         }
        //         recentX = evt.touches[0].clientX
        //         recentTimestamp = evt.timeStamp
        //         let position = (evt.touches[0].clientX + drawerOffset) / drawerWidth * 100
        //         if (position > 100)
        //             position = 100
        //         this.drawerPosition = position / 100
        //         evt.preventDefault()
        //         evt.stopPropagation()
        //     }
        //     const touchend = (evt: TouchEvent) => {
        //         window.removeEventListener('touchmove', touchmove, true)
        //         window.removeEventListener('touchend', touchend, true)
        //         let position = (evt.changedTouches[0].clientX + drawerOffset) / drawerWidth * 100
        //         if (position > 100)
        //             position = 100
        //         this.drawerPosition = position / 100
        //         diffDistance = (evt.changedTouches[0].clientX - recentX) / drawerWidth * 100
        //         diffTime = evt.timeStamp - recentTimestamp
        //         const fling = diffDistance / diffTime
        //         console.log("Fling", fling)                
        //         if (fling > 0.1) {
        //             const animate = (timestamp: number) => {
        //                 console.log("Mal sehen", timestamp)
        //                 diffTime = timestamp - recentTimestamp
        //                 recentTimestamp = timestamp
        //                 this.drawerPosition = fling * diffTime 
        //                 if (this.drawerPosition > 1)
        //                     this.drawerPosition = 1
        //                 else
        //                     requestAnimationFrame(animate)
        //             }
        //             requestAnimationFrame(animate)
        //             console.log("Mal sehen?", evt.timeStamp)
        //         }
        //         else {
        //             if (this.drawerPosition >= 0.5) {
        //                 this.drawerPosition = 1
        //                 if (!isOpen)
        //                     history.pushState("drawer", null, '/drawer')
        //             }
        //             else {
        //                 this.drawerPosition = 0
        //                 if (isOpen) 
        //                     history.back()
        //             }
        //         }
        //         evt.preventDefault()
        //         evt.stopPropagation()
        //     }                
        //     window.addEventListener('touchmove', touchmove, true)
        //     window.addEventListener('touchend', touchend, true)
        //     evt.preventDefault()
        //     evt.stopPropagation()
        // }
    //}

    
    onTouchstart(evt: TouchEvent, isOpen: boolean) {
        if ( (!isOpen && evt.touches.length == 1 && evt.touches[0].clientX < 15 &&  evt.touches[0].clientY > 55) || isOpen) {
           
            const width = window.document.body.clientWidth
            const drawerWidth = width * 79 / 100
            
            if (!isOpen) {
                this.offsetClosed = 100
                this.offsetOpened = 95
                this.opacityClosed = 0
                this.opacityOpened = 0.05
                this.drawerOpen = true
            }

            const initialX = evt.touches[0].clientX
            const initialY = evt.touches[0].clientY
            
            let drawerOffset = -1 
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
                        this.drawerOpen = false
                            evt.preventDefault()
                            evt.stopPropagation()
                            return
                    }
                }
                
                let position = (evt.touches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100
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

                let position = (evt.changedTouches[0].clientX + drawerOffset) / drawerWidth * 100
                if (position > 100)
                    position = 100

                if (position < 50) {
                    this.offsetClosed = 100
                    this.offsetOpened = 100 - position
                    this.opacityClosed = 0
                    this.opacityOpened = position / 100
                    setTimeout(() => this.drawerOpen = false)
                }
                else {
                    if (!isOpen)
                        history.pushState("drawer", null, '/drawer')  
                    else
                        // TODO: History
                    this.offsetClosed = 100 - position
                    this.offsetOpened = 100 - position
                    this.opacityClosed = position / 100
                    this.opacityOpened = position / 100
                    this.offsetTransition = 100 - position 
                    this.opacityTransition = position / 100

                    setTimeout(() => {
                        this.transitionState = 'transition'
                        this.offsetClosed = 100 - position
                        this.offsetOpened = 0
                        this.opacityClosed = position / 100
                        this.opacityOpened = 1
                    })
                    setTimeout(() => {
                        this.transitionState = 'open'
                    })
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
}
