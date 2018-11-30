import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReportingData } from "../../interfaces/reporting-data";

@Component({
  selector: "app-reporting-info",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./reporting-info.component.html",
  styleUrls: ["./reporting-info.component.scss"]
})
export class ReportingInfoComponent implements OnInit {
  private _data = new BehaviorSubject<ReportingData>({});
  reportingData: ReportingData;

  @Input()
  set contracts(value) {
    this._data.next(value);
  }

  get data() {
    return this._data.getValue();
  }

  constructor() {}

  ngOnInit() {
    this._data.subscribe(x => {
      if (this.data) this.reportingData = this.data;
    });
  }
}
