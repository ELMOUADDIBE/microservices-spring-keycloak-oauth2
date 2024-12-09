import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }

  viewProduct(id: string) {
    console.log('Viewing product:', id);
    window.location.href = `http://localhost:8081/api/products/${id}`;
  }

  editProduct(id: string) {
    console.log('Editing product:', id);
  }

  deleteProduct(id: string) {
    console.log('Deleting product:', id);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.fetchProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }
}
