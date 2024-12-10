import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  order: any;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  orderTotale: number = 0;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.orderId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchOrderDetails();
  }

  fetchOrderDetails(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (response) => {
        this.order = response;
        this.orderTotale = this.order.productItems.reduce(
          (sum: number, item: any) => sum + (item.price * item.quantity), 0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error fetching order details!', error);
        this.errorMessage = 'Failed to load order details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }
}
