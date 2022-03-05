import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Services */
import { DataService } from '../services/data.service';

@Injectable()
export class SelectedFarmService {
  constructor(private _dataService: DataService, private http: HttpClient) {}
  /* Pruebas */
  pruebas() {
    return 'Soy el servicio de SelectedFarmService';
  }

  async getFarm(id: number) {
    for (let farm of await this._dataService.getData().toPromise()) {
      if (id === farm.Id) {
        return farm;
      }
    }
  }
}
