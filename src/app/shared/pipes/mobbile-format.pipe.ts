import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobileFormat',
  standalone: true
})
export class MobileFormatPipe implements PipeTransform {

  transform(value: string): string {
    return MobileFormat(value);
  }
}

function MobileFormat(mobileNo:string):string {
  return mobileNo.slice(0,3)
  + '-'
  + mobileNo.slice(3,6)
  + '-'
  + mobileNo.slice(6);
  
}