import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Tab } from '../interfaces/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy, AfterContentInit {
  private tabClickSubscriptions: Array<any> = [];
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.tabClickSubscriptions) {
      this.tabClickSubscriptions.forEach(ts => ts.unsubscribe());
    }
  }

  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.tabs.forEach(tab => {
      let subscription = tab.onClick.subscribe(() =>
        console.log(`${tab.title}`)
      );
      this.tabClickSubscriptions.push(subscription);
    });

    this.selectTab(this.tabs.first);
  }

  addTab(tab: Tab): void {}

  selectTab(tab: Tab) {
    this.tabs.forEach(tab => (tab.isActive = false));
    tab.isActive = true;
  }
}
