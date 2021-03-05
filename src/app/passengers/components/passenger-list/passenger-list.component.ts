import { stringify } from "@angular/compiler/src/util";
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { logging } from "protractor";
import { Passenger, PassengerDTO } from "src/assets/passengers";

@Component({
  selector: "passenger-list",
  templateUrl: "passenger-list.component.html",
  styleUrls: ["./passenger-list.component.css"],
})
export class PassengerListComponent implements OnInit {
  @Input() passenger: Passenger;
  // @Output() edit: EventEmitter<Passenger> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
  editing: boolean = false;
  passengerToEmit: PassengerDTO;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.passengerToEmit = {
      ...this.passenger,
      checkInDate: new Date(this.passenger.checkInDate).toString(),
    };
  }

  toggleEdit() {
    // if (this.editing) {
    //   this.edit.emit({
    //     ...this.passenger,
    //     ...this.passengerToEmit,
    //     checkInDate: new Date(this.passengerToEmit.checkInDate).getTime(),
    //   });
    // } else {
    //   this.passengerToEmit = {
    //     ...this.passenger,
    //     checkInDate: new Date(this.passenger.checkInDate)
    //       .toISOString()
    //       .slice(0, 16),
    //   };
    //   console.log(this.passengerToEmit);
    // }
    // this.editing = !this.editing;
    this.router.navigate(["/passenger/edit"], {
      state: { passenger: { ...this.passenger } },
    });
  }

  handleRemove(id: number) {
    this.remove.emit(id);
  }
}
