import { FormControl } from "@angular/forms";

export interface category{
    category_name : string,
    description : string,
    image : File,
}

export interface categoryForm{
    category_name: FormControl<string | null>
    description : FormControl<string | null>
    image : FormControl<File | null>,
}