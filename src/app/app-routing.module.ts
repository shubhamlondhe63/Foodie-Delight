import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/new', component: RestaurantFormComponent },
  { path: 'restaurants/edit/:id', component: RestaurantFormComponent },
  { path: 'restaurants/:id', component: RestaurantDetailsComponent },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
