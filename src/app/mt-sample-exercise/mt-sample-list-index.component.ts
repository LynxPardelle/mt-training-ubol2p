import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';

/* Services */
import { DataService } from '../services/data.service';
import { SelectedFarmService } from '../services/selected-farm.service';
import { WebService } from '../services/web.service';

/* Models */
import { Farm } from '../models/farm';

/* Syncfusion Grid */
import { SortService } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'mt-sample-list',
  templateUrl: './mt-sample-list-index.component.html',
  providers: [DataService, SelectedFarmService, WebService, SortService],
})
export class MtSampleListIndexComponent implements OnInit, DoCheck {
  public selectedFilter: string = null;
  public selectOptions: string[] = ['NO', 'Active', 'Reset'];
  public isTest: boolean = true;
  @Input() farms: Farm[] = [];
  @Input() errorMSG: string = '';

  /* Console Settings */
  public document: string = 'mt-sample-list-index.component.ts';
  public customConsoleCSS = 'background-color: rgb(50,50,100); color: white;';
  // Output
  @Output() selectFarm: any = new EventEmitter<any>();
  @Output() resetFarms: any = new EventEmitter<any>();

  /* Syncfusion Grid */
  public initialSort: Object;
  public pageSettings: Object;

  constructor(private _webService: WebService) {}

  ngOnInit(): void {
    this.initialSort = {
      columns: [
        { field: 'Id', direction: 'Ascending' },
        { field: 'FarmName', direction: 'Descending' },
      ],
    };
    this.pageSettings = { pageCount: 5 };
  }
  ngDoCheck(): void {
    if (this.selectedFilter !== null) {
      this.checkForSelectedFilter();
    }
  }

  selectFarmClick(id: number) {
    this.selectFarm.emit(id);
    this.selectFarm.emit(id);
  }

  checkForSelectedFilter() {
    console.log(this.selectedFilter);
    let farms: any[];
    switch (this.selectedFilter) {
      case 'NO':
        farms = [];
        for (let farm of this.farms) {
          if (farm.FarmNo.slice(0, 3) === '100') {
            farms.push(farm);
          }
        }
        this.farms = farms;
        break;
      case 'Active':
        farms = [];
        for (let farm of this.farms) {
          let d: Date = new Date(farm.ActiveDate);
          if (d.getFullYear() === 2020) {
            farms.push(farm);
          }
        }
        this.farms = farms;
        break;
      case 'Reset':
        this.resetClick();
        break;
    }
    this.selectedFilter = null;
  }
  resetClick() {
    this.resetFarms.emit(false);
    this.resetFarms.emit(false);
  }

  errorClick() {
    this.resetFarms.emit(true);
  }

  /* Syncfusion Grid */
  onRowSelected(event: any) {
    console.log(event);
    this.selectFarmClick(event.data.Id);
  }
}
