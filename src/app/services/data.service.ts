import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
  /* Pruebas */
  pruebas() {
    return 'Soy el servicio de DataService';
  }

  public getData(): Observable<any> {
    return this.http.get('./assets/data/mock-data.json');
  }
}
