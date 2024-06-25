export interface Restaurant {
  _id?: any;
  name: string;
  description: string;
  location: string;
  openingHours: string;
  contactNumber: string;
  category: string;
  menus: Menu[];
}

export interface Menu {
  menu: string;
}
