import { Directive, ElementRef, Output, EventEmitter, HostListener, Input, HostBinding } from '@angular/core'

@Directive({
    selector: '[mkClickAnimation]'
})
export class ClickAnimationDirective {
    
    @HostListener('click', ["$event"]) click(evt: MouseEvent) {
        if (this.inClick)
            return
        this.inClick = true
        this.onClickStart.emit()

        const canvas = document.createElement("canvas")
        canvas.width = this.el.nativeElement.offsetWidth
        canvas.height = this.el.nativeElement.offsetHeight
        const context = canvas.getContext("2d")
        let lastindex = 1
        const dateNow = new Date().getTime()
        const centerX = evt.offsetX
        const centerY = evt.offsetY
        let actionExecuted = false

        const fillStyle = getComputedStyle(this.el.nativeElement, null).getPropertyValue('background-color')

        const drawCircle = (index: number) => {
            const alpha = index / 10
            if (!actionExecuted && alpha > 0.9) {
                this.onClickEnd.emit()
                actionExecuted = true
            }
            if (alpha > 1) {
                this.inClick = false
                this.el.nativeElement.style.background = ""
                return false
            }
            const radius =   alpha * (canvas.width / 2)

            context.clearRect(0, 0, canvas.width, canvas.height)

            context.beginPath()
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
            context.fillStyle = this.animatedColor
            context.globalAlpha = 1 - alpha
            context.fill()

            context.fillStyle = fillStyle
            context.globalCompositeOperation = 'destination-over'
            context.globalAlpha = 1
            context.fillRect(0, 0, canvas.width, canvas.height)

            var url = canvas.toDataURL()
            this.el.nativeElement.style.background = `url(${url})`
            return true
        }

        const animate = () => {
            var date = new Date().getTime()
            var index = Math.round((date - dateNow) / 40)
            if (index == lastindex) {
                window.requestAnimationFrame(animate)
                return
            }
            lastindex = index
            if (!drawCircle(index))
                return
            window.requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }

    @Input() 
    animatedColor = "#bbb"

    @Output() onClickStart: EventEmitter<any> = new EventEmitter()    
    @Output() onClickEnd: EventEmitter<any> = new EventEmitter()    

    constructor(private el: ElementRef) { }

    private inClick = false
}
