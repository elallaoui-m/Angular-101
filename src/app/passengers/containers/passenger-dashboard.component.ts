import { Component, OnInit } from "@angular/core";

import { Passenger } from "src/assets/passengers";
import { PassengerService } from "../passenger.service";

@Component({
  selector: "component-dashboard",
  templateUrl: "passenger-dashboard.component.html",
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
    console.log(passenger);

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

  addPassenger(passenger: Passenger) {
    this.passengerService.addPassenger(passenger).subscribe((passenger) => {
      this.passengers = [...this.passengers, passenger];
    });
  }
}
