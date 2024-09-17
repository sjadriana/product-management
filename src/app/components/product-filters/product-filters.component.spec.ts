import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Adicione esta importação
import { ProductFiltersComponent } from './product-filters.component';

describe('ProductFiltersComponent', () => {
  let component: ProductFiltersComponent;
  let fixture: ComponentFixture<ProductFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFiltersComponent, NoopAnimationsModule] // Inclua NoopAnimationsModule aqui
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
