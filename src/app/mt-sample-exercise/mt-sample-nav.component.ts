import { Component, OnInit, DoCheck } from '@angular/core';

/* Services */
import { DataService } from '../services/data.service';
import { SelectedFarmService } from '../services/selected-farm.service';
import { WebService } from '../services/web.service';

/* Models */
import { Farm } from '../models/farm';

@Component({
  selector: 'mt-sample-nav',
  templateUrl: './mt-sample-nav.component.html',
  providers: [DataService, SelectedFarmService, WebService],
})
export class MtSampleNavComponent implements OnInit, DoCheck {
  public farms: Farm[] = [];
  public isTest: boolean = true;
  public test: string = '';
  public farm: Farm;
  public errorMSG: string = '';

  /* Console Settings */
  public document: string = 'mt-sample-nav.component.ts';
  public customConsoleCSS = 'background-color: rgb(200,50,100); color: black;';

  constructor(
    private _dataService: DataService,
    private _selectedFarmService: SelectedFarmService,
    private _webService: WebService
  ) {
    if (this.isTest === true) {
      this.getTest();
    }
    this.getData();
  }

  ngOnInit(): void {
    if (this.isTest === true) {
      this.getTest();
    }
    if (!this.farms[0]) {
      this.getData();
    }
  }

  ngDoCheck(): void {}

  async getTest() {
    try {
      let [dataTest, selectedFarmTest] = [
        await this._dataService.pruebas(),
        await this._selectedFarmService.pruebas(),
      ];

      if (!dataTest && !selectedFarmTest) {
        this._webService.consoleLog(
          dataTest,
          this.document + ' 46',
          this.customConsoleCSS,
          this.isTest
        );
        this._webService.consoleLog(
          selectedFarmTest,
          this.document + ' 51',
          this.customConsoleCSS,
          this.isTest
        );
        throw new Error('There ir no tests');
      }

      this.test = 'Data Test: ' + dataTest;
      this.test += '/nSelectedFarmTest: ' + selectedFarmTest;

      this.test = this.test.replace('/n', '<br />');
    } catch (err) {
      this._webService.consoleLog(
        err,
        this.document + ' 63',
        this.customConsoleCSS,
        this.isTest
      );
    }
  }

  async getData(error: boolean = false) {
    try {
      let data;
      if (error === false) {
        data = await this._dataService.getData().toPromise();
      }
      if (!data || !data[0]) {
        throw new Error('There is no farms');
      }
      this.farms = data;
      this._webService.consoleLog(
        this.farms,
        this.document + ' 82',
        this.customConsoleCSS,
        this.isTest
      );
    } catch (err) {
      if (error) {
        this.farms = [];
      }
      this.errorMSG = err;
      this._webService.consoleLog(
        err,
        this.document + ' 90',
        this.customConsoleCSS,
        this.isTest
      );
    }
  }

  async getFarm(id: number) {
    this.farm = await this._selectedFarmService.getFarm(id);
    this._webService.consoleLog(
      this.farm,
      this.document + ' 111',
      this.customConsoleCSS,
      this.isTest
    );
  }
}
