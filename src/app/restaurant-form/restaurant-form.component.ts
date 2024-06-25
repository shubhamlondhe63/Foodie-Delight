import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/restaurant.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId?: number;
  categories: string[] = ['Italian', 'Chinese', 'Indian', 'Mexican', 'American'];
  Button: string = 'Add'

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService)
   {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      openingHours: ['', Validators.required],
      contactNumber: ['', Validators.required],
      category: ['', Validators.required],
      menus: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];
    if (this.restaurantId) {
      this.restaurantService.getRestaurant(this.restaurantId).subscribe((restaurant: Restaurant) => {
        this.restaurantForm.patchValue(restaurant);
        this.Button = "Update"
      });
    }
    this.addMenu();
  }

  submit(event: Event) {
    if (this.restaurantForm.valid) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.onSubmit();

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
    }else{
      this.restaurantForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the fields' });
    }
}


  onSubmit(): void {
      const restaurant: Restaurant = this.restaurantForm.value;
      if (this.restaurantId) {
        restaurant._id = this.restaurantId;
        this.restaurantService.updateRestaurant(restaurant).subscribe(() => {
          this.router.navigate(['/restaurants']);
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Successfully Updated !' });
        });
      } else {
        this.restaurantService.addRestaurant(restaurant).subscribe(() => {
          this.router.navigate(['/restaurants']);
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Successfully Added !' });
        });
      }
  }

  get menus() {
    return this.restaurantForm.get('menus') as FormArray;
  }

  addMenu() {
    const menuGroup = this.fb.group({
      menu: ['', Validators.required]
    });
    this.menus.push(menuGroup);
  }

  removeMenu(index: number) {
    this.menus.removeAt(index);
  }
}
