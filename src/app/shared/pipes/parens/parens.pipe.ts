import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "parens"
})
// Wrap negative numbers with () and remove the minus sign. For example -3.2 will be (3.2)
export class ParensPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value && value !== "--") {
      return value.charAt(0) === "-"
        ? `(${value.substring(1, value.length)})`
        : value;
    }
  }
}
