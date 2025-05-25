import { FormControl } from '@angular/forms'

export interface product {
  title: string | null;
  author: string | null;
  description: string | null;
  price: number | null;
  discount_type: string | null;
  discount_value: number | null;
  offer_price: number | null;
  category_id: number | null;
  stock: number | null;
  image: string | null;
  date: Date | null;
}


export interface productForm {
  title: FormControl<string | null>
  author: FormControl<string | null>
  description: FormControl<string | null>
  price: FormControl<number | null>
  discount_type: FormControl<string | null>
  discount_value: FormControl<number | null>
  offer_price: FormControl<number | null>
  category_id: FormControl<number | null>
  stock: FormControl<number | null>
  image: FormControl<string | null>
  date: FormControl<Date | null>
}
