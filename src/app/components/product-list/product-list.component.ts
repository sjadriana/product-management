import { Component, ViewChild, inject, AfterViewInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductService } from '../../services/product.service'
import { ProductFormComponent } from '../product-form/product-form.component'
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { ProductFiltersComponent } from '../product-filters/product-filters.component'
import { Product } from '../../product.model'
import { MatCardModule } from '@angular/material/card'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ProductFiltersComponent,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class ProductListComponent implements AfterViewInit {
  private productService = inject(ProductService)
  private dialog = inject(MatDialog)

  displayedColumns: string[] = ['code', 'name', 'category', 'actions']
  dataSource = new MatTableDataSource<Product>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  searchCode: string = ''
  selectedCategory: string = 'todos'

  constructor() {
    this.productService.products$.subscribe(products => {
      this.dataSource.data = products
      this.filterProducts()
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  filterProducts() {
    this.dataSource.filterPredicate = (product: Product, filter: string) => {
      const searchCodeMatch = this.searchCode ? product.code.toString().includes(this.searchCode) : true
      const categoryMatch = this.selectedCategory === 'todos' || product.category.toLowerCase() === this.selectedCategory.toLowerCase()
      return searchCodeMatch && categoryMatch
    };
    this.dataSource.filter = '' + Math.random(); // Para forçar o filtro a ser reavaliado
  }

  onFilterChanged(event: { code: string; category: string }) {
    this.searchCode = event.code
    this.selectedCategory = event.category
    this.filterProducts()
  }

  openProductForm(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '300px',
      data: product || {}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.productService.updateProduct(result)
        } else {
          this.productService.addProduct(result)
        }
      }
    })
  }

  confirmDelete(code: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: { code }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(code)
      }
    })
  }
}
