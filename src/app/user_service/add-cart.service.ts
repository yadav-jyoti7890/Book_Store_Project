import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCartService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAllProduct(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getallproduct/${id}`)
  }

  // total_val(id:number) : Observable<any>{
  //   return this.http.get(`http://localhost:3000/getproductbyid/${id}`)
  // }

  deleteCartItem(id:number){
    return this.http.delete(`http://localhost:3000/deleteCartItem/${id}`)
  }

  update_address(id:number, data:any): Observable<any>{
    return this.http.put(`http://localhost:3000/update_address/${id}`,data)
  }

  getuseraddress(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getaddress/${id}`)
  } 
  
  addOrderItem(address_id:number, item: any[]){
   const data ={
    address_id : address_id,
    item : item
   }
   console.log(data)
    
    return this.http.post(`http://localhost:3000/orderItem/`,data)
  }

  confirm_Order(order_data: any): Observable<any>{
    console.log(order_data);
    return this.http.post('http://localhost:3000/confirm_order', order_data);
  }
  
  // order_item method
  order_item(order_id:number, order_item: any[]) {
    console.log("order_item", order_item)
    const url = `http://localhost:3000/order_item/${order_id}`;
    console.log( "order items and order_id =>", order_item, order_id);
    return this.http.post(url, order_item);
  }

  my_Order(item:any){
   return this.http.post('http://localhost:3000/addMyOrder',item)
  }

  getCartDataInMyOrder(user_id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getCartOrder/${user_id}`)
  }

  deleteAllCartData(id:number){
    return this.http.delete(`http://localhost:3000/deleteAllCartData/${id}`)
  }

  getOrderData(user_id:number){
    console.log("remove obserable")
    return this.http.get(`http://localhost:3000/getCartOrderbyOrderId/${user_id}`)
  }

  
  getOrderDetails(orderId: number) {
    console.log("order_detail_id",orderId)
    return this.http.get(`${this.apiUrl}/order-details/${orderId}`);
  }

  getUserItems(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getUserItems/${id}`)
  }

  orderDetailFetch(order_id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getOderDetail/${order_id}`)
  }

// deletebooks(id:number){
  
// }










}

// SELECT
//     o.order_id,
//     o.total_item,
//     o.total_amount,
//     oi.product_id,
//     oi.price AS item_price,
//     oi.quantity,
//     p.title AS product_title,
//     p.author,
//     a.full_name,
//     a.contact,
//     a.house_no,
//     a.road_name,
//     a.city,
//     a.pincode,
//     a.state
// FROM
//     `order` AS o  -- Alias the "order" table as "o"
// JOIN
//     order_items AS oi ON o.order_id = oi.order_id  -- Join on order_id
// JOIN
//     product AS p ON oi.product_id = p.product_id  -- Join on product_id
// JOIN
//     address AS a ON o.user_id = a.user_id  -- Join on user_id
// WHERE
//     o.order_id = 7; -- Replace 7 with the desired order_id
