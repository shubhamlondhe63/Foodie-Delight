import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId?: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      openingHours: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe((restaurant: Restaurant) => {
        this.restaurantForm.patchValue(restaurant);
      });
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const restaurant: Restaurant = this.restaurantForm.value;
      if (this.restaurantId) {
        restaurant._id = this.restaurantId;
        this.restaurantService.updateRestaurant(restaurant).subscribe(() => {
          this.router.navigate(['/restaurants']);
        });
      } else {
        this.restaurantService.addRestaurant(restaurant).subscribe(() => {
          this.router.navigate(['/restaurants']);
        });
      }
    }
  }
}
