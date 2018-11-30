import { DataTableSettings } from "./interfaces/data-table-settings";
import { ElementRef, AfterViewInit } from "@angular/core";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements AfterViewInit {
  @Input() records: any[];
  @Input() tableSetting: DataTableSettings;
  @Output() rowSelected = new EventEmitter();
  public selectedRow: any;

  constructor(private elem: ElementRef) {}

  // 508 fix for pagination icons labels
  ngAfterViewInit() {
    const paginatorFirst = this.elem.nativeElement.querySelectorAll(
      ".ui-paginator-first"
    );
    const paginatorPrev = this.elem.nativeElement.querySelectorAll(
      ".ui-paginator-prev"
    );
    const paginatorNext = this.elem.nativeElement.querySelectorAll(
      ".ui-paginator-next"
    );
    const paginatorLast = this.elem.nativeElement.querySelectorAll(
      ".ui-paginator-last"
    );
    const paginatorDropdownMenu = this.elem.nativeElement.querySelectorAll(
      "ul.ui-dropdown-items"
    );
    const paginatorDropdownMenuItems = this.elem.nativeElement.querySelectorAll(
      "ul.ui-dropdown-items li"
    );
    const dropdownhiddenInput = this.elem.nativeElement.querySelectorAll(
        ".ui-dropdown .ui-helper-hidden-accessible input[role='listbox']"
    );
    const dtable = this.elem.nativeElement.querySelectorAll(
        ".ui-table-wrapper table"
    );
    // accessibility for sort icons.
    const sortLabel = this.elem.nativeElement.querySelectorAll("a[aria-label= '']");
    sortLabel.forEach(label => label.setAttribute('aria-label', 'Activate to sort column.'));

    // 508 enhancements for datatable
    if (paginatorFirst && paginatorFirst.length > 0) {
      paginatorFirst[0].setAttribute("aria-label", "Paginator First");
      paginatorFirst[0].setAttribute("id", "paginator-first");
      paginatorPrev[0].setAttribute("aria-label", "Paginator Previous");
      paginatorPrev[0].setAttribute("id", "paginator-previous");
      paginatorNext[0].setAttribute("aria-label", "Paginator Next");
      paginatorNext[0].setAttribute("id", "paginator-next");
      paginatorLast[0].setAttribute("aria-label", "Paginator Last");
      paginatorLast[0].setAttribute("id", "paginator-last");
      paginatorDropdownMenu[0].setAttribute("role", "menu");
      dropdownhiddenInput[0].removeAttribute("role");
      for (var i = 0; i < paginatorDropdownMenuItems.length; i++) {
        paginatorDropdownMenuItems[i].setAttribute("role", "menuitem");
      }
    }
    // add table summery for screen readers
    dtable[0].setAttribute("summary", this.tableSetting.summary);
    dtable[0].setAttribute("role", "grid");
  }

  // Used on radio button or checkbox selection/unselections
  onRowSelected() {
    this.rowSelected.emit(this.selectedRow);
  }

  onRowUnselect(event) {
    this.rowSelected.emit(this.selectedRow);
  }

  // Custom Sort for data table - handles null and empty strings coming from api
  customSort(event) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (
        (value1 === null || value1 === "--" || value1 === "") &&
        (value2 !== null || value2 !== "--" || value2 !== "")
      ) {
        result = -1;
      } else if (
        (value1 !== null || value1 !== "--" || value1 !== "") &&
        (value2 === null || value2 === "--" || value2 === "")
      ) {
        result = 1;
      } else if (
        (value1 === null || value1 === "--" || value1 === "") &&
        (value2 === null || value2 === "--" || value2 === "")
      ) {
        result = 0;
      } else if (typeof value1 === "string" && typeof value2 === "string") {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return event.order * result;
    });
  }
}
