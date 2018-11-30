import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[collapsePanel]",
  exportAs: "collapsePanel",
  host: { "[class.collapse]": "true", "[class.show]": "!collapsed" }
})
export class CollapsePanelDirective {
  @Input("collapsePanel") collapsed = false;

  constructor() {}
}
