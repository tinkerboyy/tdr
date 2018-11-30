import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  LoadingBarEventType,
  LoadingBarService,
  LoadingBarEvent
} from './services/loading-bar.service';
import { isPresent } from './loading-bar-utils';

@Component({
  selector: 'app-loading-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, AfterViewInit {
  isTransition: string = 'none';

  private _progress: string = '0';
  @Input()
  set progress(progress: string) {
    this.isTransition =
      progress >= this._progress ? 'all 0.5s ease-in-out' : 'none';
    this._progress = progress;
  }

  get progress() {
    return this._progress;
  }

  @Input() color: string = 'firebrick';
  @Input() height: string = '4px';
  @Input() show: boolean = true;

  constructor(
    public service: LoadingBarService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.events.subscribe((event: LoadingBarEvent) => {
      if (
        event.type === LoadingBarEventType.PROGRESS &&
        isPresent(event.value)
      ) {
        this.progress = event.value;
      } else if (event.type === LoadingBarEventType.COLOR) {
        this.color = event.value;
      } else if (event.type === LoadingBarEventType.HEIGHT) {
        this.height = event.value;
      } else if (event.type === LoadingBarEventType.VISIBLE) {
        this.show = event.value;
      }
    });
  }

  ngAfterViewInit(): void {
    this.service.events.subscribe((event: LoadingBarEvent) => {
      this._elmRef.nativeElement.visible =
        event.type === LoadingBarEventType.VISIBLE ? event.value : true;
      this._changeDetectorRef.detectChanges();
    });
  }
}
