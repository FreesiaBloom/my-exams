import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return null;
    const newStr = value.split(' ').slice(0,5).join(' ');
    return (newStr.length >= value.length) ? value : newStr + '...';
  }
}
