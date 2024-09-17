import { TestBed } from '@angular/core/testing'
import { ProductService } from './product.service'
import { Product } from '../components/model/product.model'

describe('ProductService', () => {
  let service: ProductService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return a list of categories', () => {
    const categories = service.getCategories()
    expect(categories).toEqual(['Atacado', 'Varejo', 'Internacional',])
  })

  it('should check if a product code exists', (done) => {
    service.checkCodeExists('non-existent-code').subscribe(result => {
      expect(result).toBe(false)
      done();
    });
  });

  it('should add a new product', () => {
    const newProduct: Product = {
      id: '21',
      code: '1211',
      name: 'Produto 21',
      category: 'varejo'
    }
    service.addProduct(newProduct)
    service.products$.subscribe(products => {
      expect(products).toContain(newProduct)
    })
  })

  it('should update an existing product', (done) => {
    const updatedProduct = { id: '1', code: '1011', name: 'Produto Atualizado', category: 'varejo' };
    service.addProduct({ id: '1', code: '1011', name: 'Produto Antigo', category: 'varejo' });
    service.updateProduct(updatedProduct);
    service.products$.subscribe(products => {
      const product = products.find(p => p.code === '1011');
      expect(product).toEqual(updatedProduct);
      done();
    });
  });


  it('should delete a product', () => {
    const codeToDelete = '1011'
    service.deleteProduct(codeToDelete)
    service.products$.subscribe(products => {
      const product = products.find(p => p.code === codeToDelete)
      expect(product).toBeUndefined()
    })
  })
})

