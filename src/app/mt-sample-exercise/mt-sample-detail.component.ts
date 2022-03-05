import { Component, Input } from '@angular/core';

/* Services */
import { SelectedFarmService } from '../services/selected-farm.service';

/* Models */
import { Farm } from '../models/farm';

@Component({
  selector: 'mt-sample-detail',
  templateUrl: './mt-sample-detail.component.html',
})
export class MtSampleDetailComponent {
  @Input() farm: Farm;
  constructor() {}
}
