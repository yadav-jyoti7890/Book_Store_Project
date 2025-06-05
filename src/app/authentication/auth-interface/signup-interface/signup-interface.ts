import { FormControl } from "@angular/forms";

export interface signup{
    username : string | null;
    email : string | null;
    password : string | null;
}

export interface signupForm{
    username : FormControl<string | null>
    email : FormControl<string  | null>
    password : FormControl<string | null>
}

export interface login{
    email : string | null;
    password : string | null;
}

export interface loginForm{
    email : FormControl<string  | null>
    password : FormControl<string | null>
}