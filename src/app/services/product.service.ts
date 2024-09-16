import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { Product } from '../components/model/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([])
  products$ = this.productsSubject.asObservable()

  private categories = ['Atacado', 'Varejo', 'Internacional']

  constructor() {
    this.productsSubject.next([
      {
        "id": "1",
        "code": 1011,
        "name": "Produto 1",
        "category": "Atacado"
      },
      {
        "id": "2",
        "code": 1022,
        "name": "Produto 2",
        "category": "Varejo"
      },
      {
        "id": "3",
        "code": 1033,
        "name": "Produto 3",
        "category": "Internacional"
      },
      {
        "id": "4",
        "code": 1044,
        "name": "Produto 4",
        "category": "Atacado"
      },
      {
        "id": "5",
        "code": 1055,
        "name": "Produto 5",
        "category": "Varejo"
      },
      {
        "id": "6",
        "code": 1066,
        "name": "Produto 6",
        "category": "Internacional"
      },
      {
        "id": "7",
        "code": 1077,
        "name": "Produto 7",
        "category": "Atacado"
      },
      {
        "id": "8",
        "code": 1088,
        "name": "Produto 8",
        "category": "Varejo"
      },
      {
        "id": "9",
        "code": 1099,
        "name": "Produto 9",
        "category": "Internacional"
      },
      {
        "id": "10",
        "code": 1100,
        "name": "Produto 10",
        "category": "Atacado"
      },
      {
        "id": "11",
        "code": 1111,
        "name": "Produto 11",
        "category": "Varejo"
      },
      {
        "id": "12",
        "code": 1122,
        "name": "Produto 12",
        "category": "Internacional"
      },
      {
        "id": "13",
        "code": 1133,
        "name": "Produto 13",
        "category": "Atacado"
      },
      {
        "id": "14",
        "code": 1144,
        "name": "Produto 14",
        "category": "Varejo"
      },
      {
        "id": "15",
        "code": 1155,
        "name": "Produto 15",
        "category": "Internacional"
      },
      {
        "id": "16",
        "code": 1166,
        "name": "Produto 16",
        "category": "Atacado"
      },
      {
        "id": "17",
        "code": 1177,
        "name": "Produto 17",
        "category": "Varejo"
      },
      {
        "id": "18",
        "code": 1188,
        "name": "Produto 18",
        "category": "Internacional"
      },
      {
        "id": "19",
        "code": 1199,
        "name": "Produto 19",
        "category": "Atacado"
      },
      {
        "id": "20",
        "code": 1200,
        "name": "Produto 20",
        "category": "Varejo"
      }
    ])
  }

  getCategories(): string[] {
    return this.categories
  }

  checkCodeExists(code: number): Observable<boolean> {
    const products = this.productsSubject.getValue()
    const exists = products.some(product => product.code === code)
    return of(exists)
  }

  addProduct(product: Product): void {
    const products = this.productsSubject.getValue()
    this.productsSubject.next([...products, product])
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.productsSubject.getValue().map(product =>
      product.code === updatedProduct.code ? updatedProduct : product
    )
    this.productsSubject.next(products)
  }

  deleteProduct(code: number): void {
    const products = this.productsSubject.getValue().filter(product => product.code !== code)
    this.productsSubject.next(products)
  }
}
