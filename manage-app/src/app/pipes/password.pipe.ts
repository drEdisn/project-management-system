import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password',
  standalone: true,
})
export class PasswordPipe implements PipeTransform {

  transform(value: any, hide: boolean = true): unknown {
    return !hide ? String(value).replace(/./g, '*') : value;
  }

}
