import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {
  consoleLog(
    thing: any,
    line: string = '',
    style: string = 'padding: 1em;',
    isTrue: boolean = false
  ) {
    if (isTrue) {
      if (line && line !== '') {
        console.log('%cline: ' + line + ' = ', style);
      } else {
        console.groupCollapsed('Trace');
        console.trace();
        console.groupEnd();
      }
      if (typeof thing !== 'object') {
        console.log(`%c${thing}`, style);
      } else {
        console.log(thing);
        console.dir(thing);
      }
    }
  }
}
