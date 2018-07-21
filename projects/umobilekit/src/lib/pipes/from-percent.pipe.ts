import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'fromPercent'
})
export class FromPercentPipe implements PipeTransform {

    transform(value: number): any {
        return value / 100
    }
}
