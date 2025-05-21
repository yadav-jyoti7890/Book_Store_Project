import { FormControl } from '@angular/forms'

export interface product {
  title: string ;
  author: string;
  description: string;
  price:number | null;
  discount_type: number | null;
  discount_value: number | null;
  offer_price: number | null;
  category_id: number | null;
  stock_quantity: number | null;
  sold_quantity: number | null
  image: string
  publication_date: Date
}

export interface productForm {
  title?: FormControl<string | null>
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
