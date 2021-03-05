import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PassengerDashboardComponent } from "./passengers/containers/passenger-dashboard.component";
import { PassengerForm } from "./passengers/components/passenger-form/passenger-form.component";
import { PassengerAddComponent } from "./passengers/containers/passenger-add/passenger-add.component";

const routes: Routes = [
  { path: "passengers", component: PassengerDashboardComponent },
  { path: "passenger/new", component: PassengerAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
