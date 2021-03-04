import { Component, OnInit } from "@angular/core";

import { Passenger } from "src/assets/passengers";
import { PassengerService } from "../passenger.service";

@Component({
  selector: "component-dashboard",
  template: `
    <h3>AirLine passengers</h3>
    <passenger-counter [items]="passengers || []"></passenger-counter>
    <passenger-list
      *ngFor="let passenger of passengers"
      [passenger]="passenger"
      (edit)="editPassenger($event)"
      (remove)="removePassenger($event)"
    ></passenger-list>
  `,
  styleUrls: ["./passenger-dashboard.component.css"],
})
export class PassengerDashboardComponent implements OnInit {
  public passengers;

  constructor(private passengerService: PassengerService) {}

  ngOnInit() {
    this.getPassengers();
  }

  getPassengers(): void {
    this.passengerService
      .getPassengers()
      .subscribe((passengers) => (this.passengers = passengers));
  }

  editPassenger(passenger: Passenger) {
    this.passengerService
      .editPassenger(passenger)
      .subscribe(
        (passenger) =>
          (this.passengers = this.passengers.map((e) =>
            e.id === passenger.id ? passenger : e
          ))
      );
  }

  removePassenger(id: number) {
    this.passengerService
      .removePassenger(id)
      .subscribe(
        () => (this.passengers = this.passengers.filter((e) => e.id !== id))
      );
  }
}
