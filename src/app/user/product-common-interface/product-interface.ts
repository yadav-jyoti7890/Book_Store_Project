export interface product{
   title : string;
   author : string;
   description : string;
   image : File | string;
   price : number;
   discount_type : number;
   discount_value : number;
   offer_price : number;
   publication_date : Date;
   rating: number;
}

export interface addToCartData{
    user_id : number;
    product_id : number;
    title : string;
    price : number;
    quantity : number;
    image : File | string;
    total_amount: number;
    description : string;
}