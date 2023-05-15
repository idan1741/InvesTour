import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDisplay'
})
export class ChangeDisplayPipe implements PipeTransform {
  transform(value: number): string {
    const roundedValue = Math.round(value * 100) / 100; 
    return roundedValue.toFixed(2);
  }
}