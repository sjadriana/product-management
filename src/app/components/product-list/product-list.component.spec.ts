import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'

import { ProductListComponent } from './product-list.component'
import { ProductService } from '../../services/product.service'
import { Product } from '../model/product.model'
import { ProductFiltersComponent } from '../product-filters/product-filters.component'
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { ProductFormComponent } from '../product-form/product-form.component'

class MockProductService {
  products$ = of([{ code: '1', name: 'Product 1', category: 'Category 1' } as Product]);
  addProduct(product: Product) {
    console.log('Add product called with:', product);
    return of(product);
  }

  updateProduct(product: Product) {
    console.log('Update product called with:', product);
    return of(product);
  }

  deleteProduct(code: string) {
    console.log('Delete product called with code:', code);
    return of(code);
  }
}
class MockMatDialog {
  open() {
    return {
      afterClosed: () => of(true)
    }
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ProductListComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        ProductFiltersComponent,
        ConfirmDeleteComponent,
        ProductFormComponent
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should filter products based on search code', () => {
    component.searchCode = '1'
    component.filterProducts()
    expect(component.dataSource.filteredData.length).toBe(1)
  })

  it('should open product form dialog', () => {
    const openSpy = spyOn(component['dialog'], 'open').and.callThrough()
    component.openProductForm()
    expect(openSpy).toHaveBeenCalled()
  })

  it('should confirm deletion', () => {
    const openSpy = spyOn(component['dialog'], 'open').and.callThrough()
    component.confirmDelete('1')
    expect(openSpy).toHaveBeenCalled()
  })
})
