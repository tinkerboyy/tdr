import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  headers = require('raw-loader!../../markdown/headers.md');
  tables = require('raw-loader!../../markdown/tables.md');
  architecture = require('raw-loader!../../markdown/architecture.md');
  javascript = require('raw-loader!../../markdown/javascript-guide.md');

  constructor() {}

  ngOnInit() {}

  onPageUp() {
    window.scrollTo(0, 0);
  }
}
