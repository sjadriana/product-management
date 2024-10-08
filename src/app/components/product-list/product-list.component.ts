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
import { Product } from '../model/product.model'
import { MatCardModule } from '@angular/material/card'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { BannerComponent } from '../banner/banner.component'

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
    BannerComponent
  ]
})
export class ProductListComponent implements AfterViewInit {
  private productService = inject(ProductService)
  private dialog = inject(MatDialog)

  displayedColumns: string[] = ['code', 'name', 'category', 'actions']
  dataSource = new MatTableDataSource<Product>()
  noProductsFound = false

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  searchCode = ''
  selectedCategory = 'todos'

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
    this.dataSource.filterPredicate = (product: Product) => {
      const searchCodeMatch = this.searchCode ? product.code.toUpperCase().includes(this.searchCode.toUpperCase()) : true;
      const categoryMatch = this.selectedCategory === 'todos' || product.category.toLowerCase() === this.selectedCategory.toLowerCase()
      return searchCodeMatch && categoryMatch
    }

    this.dataSource.filter = '' + Math.random()
    this.noProductsFound = this.dataSource.filteredData.length === 0
  }

  onFilterChanged(event: { code: string; category: string }) {
    this.searchCode = event.code.toUpperCase()
    this.selectedCategory = event.category
    this.filterProducts();
  }


  openProductForm(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '50vw',
      data: product || {}
    });

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

  confirmDelete(code: string) {
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
