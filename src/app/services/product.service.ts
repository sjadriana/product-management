import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { Product } from '../components/model/product.model'
import { productMocks } from '../mocks/products/        product-mocks'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([])
  products$ = this.productsSubject.asObservable()

  private categories = ['Atacado', 'Varejo', 'Internacional']

  constructor() {
    this.productsSubject.next(productMocks)
  }

  getCategories(): string[] {
    return this.categories
  }

  checkCodeExists(code: string): Observable<boolean> {
    const products = this.productsSubject.getValue();
    const exists = products.some(product => product.code.toUpperCase() === code.toUpperCase());
    return of(exists);
  }


  addProduct(product: Product): void {
    const products = this.productsSubject.getValue()
    this.productsSubject.next([...products, product])
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.productsSubject.getValue();
    const updatedProducts = products.map(product =>
      product.code === updatedProduct.code ? { ...product, ...updatedProduct } : product
    );
    this.productsSubject.next(updatedProducts);
  }


  deleteProduct(code: string): void {
    const products = this.productsSubject.getValue().filter(product => product.code !== code)
    this.productsSubject.next(products)
  }
}
