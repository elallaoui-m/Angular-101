import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Passenger } from "src/assets/passengers";
import { PassengerService } from "../passenger.service";

@Component({
  selector: "component-dashboard",
  templateUrl: "passenger-dashboard.component.html",
  styleUrls: ["./passenger-dashboard.component.css"],
})
export class PassengerDashboardComponent implements OnInit, OnDestroy {
  public passengers;

  private removeSubcription$: Subscription;
  private editSubcription$: Subscription;

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
    this.editSubcription$ = this.passengerService
      .editPassenger(passenger)
      .subscribe(
        (passenger) =>
          (this.passengers = this.passengers.map((e) =>
            e.id === passenger.id ? passenger : e
          ))
      );
  }

  removePassenger(id: number) {
    this.removeSubcription$ = this.passengerService
      .removePassenger(id)
      .subscribe(
        () => (this.passengers = this.passengers.filter((e) => e.id !== id))
      );
  }

  ngOnDestroy(): void {
    this.removeSubcription$?.unsubscribe();
    this.editSubcription$?.unsubscribe();
  }
}
