import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {

  transform(timestamp: number | Date): string {
    if (!timestamp) return '';
    return formatDistanceToNow(timestamp, { addSuffix: true });
  } 

}
