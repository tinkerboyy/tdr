import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  items: any[];
  constructor(private mainMenuService: NavigationService) {}

  ngOnInit() {
    // Get menu items from the menu service
    this.items = this.mainMenuService.getMenuItems();
  }

  menuClicked() {
    console.log('fsdfksjfhdskfjhsfkhskh');
  }
}
