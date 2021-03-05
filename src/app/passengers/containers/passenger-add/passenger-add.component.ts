import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Passenger } from "src/assets/passengers";
import { PassengerService } from "../../passenger.service";

@Component({
  selector: "passenger-add-form",
  templateUrl: "passenger-add.component.html",
  styleUrls: ["passenger-add.component.css"],
})
export class PassengerAddComponent implements OnDestroy {
  private addSubcription$: Subscription;

  constructor(
    private passengerService: PassengerService,
    private location: Location,
    private router: Router
  ) {}

  addPassenger(passenger: Passenger) {
    this.addSubcription$ = this.passengerService
      .addPassenger(passenger)
      .subscribe((passenger) => {
        this.router.navigate(["/passengers"]);
      });
  }

  ngOnDestroy() {
    this.addSubcription$?.unsubscribe();
  }
}
