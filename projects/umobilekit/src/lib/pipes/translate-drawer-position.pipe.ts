import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'translateDrawerPosition'
})
export class TranslateDrawerPositionPipe implements PipeTransform {

    transform(value: number): any {
        return `translateX(${((value * 100) - 100)}%)`
    }
}
