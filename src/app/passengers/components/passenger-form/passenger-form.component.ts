import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Passenger } from "src/assets/passengers";

@Component({
  selector: "passenger-form",
  templateUrl: "passenger-form.component.html",
  styleUrls: ["passenger-form.component.css"],
})
export class PassengerForm {
  @Output() add: EventEmitter<Passenger> = new EventEmitter();
  constructor() {}

  onSubmit = (form: NgForm) => {
    let passenger = Object.assign({}, form.value as Passenger);
    passenger.checkInDate = this.toTimestamp(passenger.checkInDate);
    this.add.emit(passenger);
    form.reset();
  };

  private toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum;
  };
}
