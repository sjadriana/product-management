import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { ProductService } from '../../services/product.service'; // Import ProductService
import { ProductFormComponent } from '../product-form/product-form.component'; // Import ProductFormComponent
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'; // Import ConfirmDeleteComponent
import { ProductFiltersComponent } from '../product-filters/product-filters.component'; // Import ProductFiltersComponent
import { Product } from '../../product.model'; // Import Product model
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule, // Necessário para elementos estruturais do Angular (como ngIf e ngFor)
    ReactiveFormsModule, // Para trabalhar com formulários reativos
    FormsModule, // Para trabalhar com ngModel e formulários de template-driven
    MatButtonModule, // Para os botões do Angular Material
    MatTableModule, // Para a tabela do Angular Material
    MatIconModule, // Para os ícones de edição e exclusão
    MatInputModule, // Para os inputs
    MatSelectModule, // Para os selects do Angular Material
    ProductFiltersComponent, // Importa o componente de filtros
    MatCardModule,
    MatPaginatorModule,
    MatPaginator
  ]
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['code', 'name', 'category', 'actions'];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchCode: string = '';
  selectedCategory: string = 'todos';

  constructor() {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filterProducts();
    });
  }
  
  

  filterProducts() {
    this.filteredProducts = this.products.filter(p =>
      (this.searchCode ? p.code.toString().includes(this.searchCode) : true) &&
      (this.selectedCategory === 'todos' || p.category.toLowerCase() === this.selectedCategory.toLowerCase())
    );
  }
  onFilterChanged(event: { code: string; category: string }) {
    this.searchCode = event.code;
    this.selectedCategory = event.category;
    this.filterProducts();
  }

  openProductForm(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '300px',
      data: product || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.productService.updateProduct(result);
        } else {
          this.productService.addProduct(result);
        }
      }
    });
  }

  confirmDelete(code: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: { code }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(code);
      }
    });
  }
}
