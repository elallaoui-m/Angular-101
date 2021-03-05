import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Passenger, PassengerDTO } from "src/assets/passengers";

@Component({
  selector: "passenger-form",
  templateUrl: "passenger-form.component.html",
  styleUrls: ["passenger-form.component.css"],
})
export class PassengerForm implements OnInit {
  @Output() emit: EventEmitter<Passenger> = new EventEmitter();
  @Input() oldPassenger: Passenger;

  passenger: PassengerDTO = {
    fullName: "",
    checkedIn: false,
    id: 0,
    checkInDate: null,
  };
  constructor() {}
  ngOnInit(): void {
    if (this.oldPassenger) {
      this.passenger = {
        ...this.oldPassenger,
        checkInDate: new Date(this.oldPassenger.checkInDate)
          .toISOString()
          .slice(0, 16),
      };
    }
  }

  onSubmit = (form: NgForm) => {
    let passenger: Passenger = {
      ...this.passenger,
      checkInDate: this.toTimestamp(this.passenger.checkInDate),
    };
    this.emit.emit(passenger);
    form.reset();
  };

  private toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum;
  };
}
