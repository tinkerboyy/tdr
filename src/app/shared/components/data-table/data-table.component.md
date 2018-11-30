---
title: DataTable Component
---

The DataTable Component was built on top of PrimeNG TurboTable. It provides most of the advanced features that TurboTable provides in addition to TDR-specific functiolalities, all displayed using TDR's style guide.

### Usage

```html
<app-data-table 
  [records]="dtRecords" 
  [tableSetting]="dtSettings">
</app-data-table>
```
### OPTIONS

  | Options                  | Type              | Default/Values      |   Description              |
  | ------------------------ | ----------------- | ------------------- | -------------------------- |      
  | records                  | Object            |                     | table data                 |
  | tableSetting             | Object            |                     | example below


tableSetting object example:

exapleDataTableSettings: DataTableSetting = {
    sortColumn: 'last_reported', // specify default sort column
    sortOrder: '-1', // 1 for ascending or -1 for descending
    selectable: '', // empty string as default, 'radio' to enable selection through a radio button, 'checkbox' to enable multirow   selection. If selectable is enabled, an event listener (rowSelected) needs to be added to the parent component to listen for row/rows selection.
    columns: [
      {
        field: 'contract_id', // key (from data object)
        header: 'Contract Number', // table header for the column
        width: '20%', //specify the column width in %
        format: 'link', // user either 'date_full' (to show full date), 
                        // 'date_month' (to convert month number to short month name e.g. 3 to Mar), 
                        // 'balance' (to display formatted outstanding balace), 
                        // 'button' (to display a customized button. btnIcon and btnText need to be enabled),
                        // 'hidden' (use to hide a specific column in which the hidden column's data will be needed for filtering)
                        // 'link' : 'href_search' // (optional) use when the format is 'link' to specify which api value to link to
        // btnIcon: 'fa-search' // (optional) use when format is 'button' to show a font-aswome icon inside the button
        // btnText: 'Pay' // (optional) use when format is 'button' to specify the button text
        // btnIcon: 'fa-search' // (optional) use when format is 'button' to show a font-aswome icon inside the button
        // btnText: 'Pay' // (optional) use when format is 'button' to specify the button text
}