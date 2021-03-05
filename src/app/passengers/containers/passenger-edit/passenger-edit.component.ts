import { Location } from "@angular/common";
import { stringify } from "@angular/compiler/src/util";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { Passenger, PassengerDTO } from "src/assets/passengers";
import { PassengerService } from "../../passenger.service";

@Component({
  selector: "passenger-edit-form",
  templateUrl: "passenger-edit.component.html",
  styleUrls: ["passenger-edit.component.css"],
})
export class PassengerEditComponent implements OnInit, OnDestroy {
  private editSubcription$: Subscription;
  public oldPassenger: Passenger;

  constructor(
    private passengerService: PassengerService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.oldPassenger = {
      ...history.state.passenger,
    };
  }

  editPassenger(passenger: Passenger) {
    this.editSubcription$ = this.passengerService
      .editPassenger(passenger)
      .subscribe((passenger) => {
        this.router.navigate(["/passengers"]);
      });
  }

  ngOnDestroy() {
    this.editSubcription$?.unsubscribe();
  }
}
