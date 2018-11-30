import { Component, OnInit, Renderer2 } from "@angular/core";
import { Alert } from "./interfaces/alert";
import { AlertType } from "./interfaces/alert-type";
import { AlertsService } from "./services/alerts.service";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  styleUrls: ["./alerts.component.scss"]
})
export class AlertsComponent implements OnInit {
  public alerts: Alert[] = [];
  public alertToBeRemoved: Alert;
  constructor(
    private alertService: AlertsService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      this.alerts = [];
      this.alerts.push(alert);
      this.alerts.slice();
      window.scrollTo(0, 0);
      /* let current = this;
      setTimeout(function(){
        current.removeAlerts();
      }, 15000); */
    });
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
    this.alertToBeRemoved = null;
  }

  removeAlerts() {
    this.alerts = [];
    this.alerts.slice();
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return "tdr-alert-success";
      case AlertType.Error:
        return "tdr-alert-danger";
      case AlertType.Info:
        return "tdr-alert-info";
      case AlertType.Warning:
        return "tdr-alert-warning";
    }
  }
}
