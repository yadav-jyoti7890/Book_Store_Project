import { CommonModule, Location } from '@angular/common';

import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ViewDetailService } from '../view-services/view-detail.service';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { product } from '../../product-info/product-interface/product-interface';
import { FormsModule } from '@angular/forms';
import { StarRatingPipe } from '../../pipes/star-rating.pipe';
import { LoaderBase } from '../../../loader/loader';

@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, StarRatingPipe],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css',
})
export class ViewDetailComponent extends LoaderBase implements OnInit {
  private count = new BroadcastChannel('count');
  public imageBaseUrl = environment.BaseUrl;
  public id!: number;
  public view_book: any[] = [];
  public quantity: number = 1;
  public getuserid: any;
  public increase: any;
  public user_id: any;
  public total_count: any;
  public FeedBack: any;
  public currentIndex = 0;
  public batchSize = 2; // byDefault
  public visibleFeedbacks: any[] = [];
  showAll: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private view_detail: ViewDetailService,
    private ngzone: NgZone,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const view_detail_Id = params.get('id');
      if (view_detail_Id) {
        this.id = +view_detail_Id;
        this.viewDetail();
      }
    });
    this.getAllFeedBack();
  }

  private viewDetail() {
    this.view_detail.getBookDetail(this.id).subscribe((response) => {
      // console.log(response);
      this.view_book = response.data;
    });
  }

  add() {
    console.log('add');
    if (this.quantity < 10) {
      this.quantity += 1;
    }
  }

  substract() {
    console.log('minus');
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  add_cart(data: any) {
    console.log(data);

    let user_id = localStorage.getItem('user_id');
    const addtobook = {
      title: data.title,
      description: data.description,
      user_id: user_id,
      book_id: data.product_id,
      price: data.price,
      image: data.image,
    };
    this.view_detail.addToCart(addtobook).subscribe(
      (data) => {
        this.add_cart_count();
        this.snackBar.open('add to cart successfully', 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['./book']);
        console.log('add');
      },
      (error) => {
        this.snackBar.open('not add inside the cart', 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  add_cart_count() {
    // console.log('User logout up!');
    this.count.postMessage({ type: 'add_cart_count' });
  }

  goBack() {
    this._location.back();
  }

  getAllFeedBack() {
    this.view_detail.getAllFeedBack(this.id).subscribe((response) => {
      // console.log(response, "feedback");

      this.FeedBack = response.data;
      this.currentIndex = this.batchSize;
      this.visibleFeedbacks = this.FeedBack.slice(0, this.currentIndex);
      // console.log(this.batchSize, this.currentIndex,this.visibleFeedbacks)
    });
  }

  loadMoreFeedback(): void {
    // console.log(this.FeedBack, this.currentIndex,this.visibleFeedbacks)
    this.showLoader();
    const nextBatch = this.FeedBack.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );
    console.log(
      nextBatch,
      '=nextbatch',
      this.currentIndex,
      this.currentIndex + this.batchSize
    );
    this.visibleFeedbacks = [...this.visibleFeedbacks, ...nextBatch];
    this.currentIndex += this.batchSize;
    // console.log(this.currentIndex);

    this.hideLoader();
  }

  loadLessFeedback() {
    this.showLoader();
    this.currentIndex = this.batchSize;
    this.visibleFeedbacks = this.FeedBack.slice(0, this.currentIndex);
    this.hideLoader();
  }

  get hasMore(): boolean {
    return this.currentIndex < this.FeedBack.length;
  }

  toggleFeedback() {
    this.showAll = !this.showAll;
  }
}
