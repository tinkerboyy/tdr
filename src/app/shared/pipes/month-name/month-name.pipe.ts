import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "monthName"
})
// Convert month number to short month name. For example 2 to Feb
export class MonthNamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    if (value && value !== "--") {
      if (value.indexOf("-") !== -1) {
        value = value.split("-");
        const valueFrom = parseInt(value[0], 10);
        const valueTo = parseInt(value[1], 10);
        return `${monthNames[valueFrom - 1]} - ${monthNames[valueTo - 1]}`;
      } else {
        return monthNames[parseInt(value, 10) - 1];
      }
    } else {
      return "--";
    }
  }
}
