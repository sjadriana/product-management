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
        "code": "XRT",
        "name": "SPDR S&P Retail ETF",
        "category": "Varejo"
      },
      {
        "id": "2",
        "code": "IBUY",
        "name": "Amplify Online Retail ETF",
        "category": "Varejo"
      },
      {
        "id": "3",
        "code": "RTH",
        "name": "VanEck Vectors Retail ETF",
        "category": "Varejo"
      },
      {
        "id": "4",
        "code": "RCD",
        "name": "Invesco S&P 500 Equal Weight Consumer Discretionary ETF",
        "category": "Varejo"
      },
      {
        "id": "5",
        "code": "XLY",
        "name": "Consumer Discretionary Select Sector SPDR Fund",
        "category": "Varejo"
      },
      {
        "id": "6",
        "code": "IYT",
        "name": "iShares U.S. Transportation ETF",
        "category": "Atacado"
      },
      {
        "id": "7",
        "code": "XTN",
        "name": "SPDR S&P Transportation ETF",
        "category": "Atacado"
      },
      {
        "id": "8",
        "code": "PTF",
        "name": "Invesco Dynamic Transportation ETF",
        "category": "Atacado"
      },
      {
        "id": "9",
        "code": "CHIX",
        "name": "Global X MSCI China Financials ETF",
        "category": "Atacado"
      },
      {
        "id": "10",
        "code": "XLI",
        "name": "Industrial Select Sector SPDR Fund",
        "category": "Atacado"
      },
      {
        "id": "11",
        "code": "VEU",
        "name": "Vanguard FTSE All-World ex-US ETF",
        "category": "Internacional"
      },
      {
        "id": "12",
        "code": "EEM",
        "name": "iShares MSCI Emerging Markets ETF",
        "category": "Internacional"
      },
      {
        "id": "13",
        "code": "ACWX",
        "name": "iShares MSCI ACWI ex U.S. ETF",
        "category": "Internacional"
      },
      {
        "id": "14",
        "code": "VXUS",
        "name": "Vanguard Total International Stock ETF",
        "category": "Internacional"
      },
      {
        "id": "15",
        "code": "IOO",
        "name": "iShares Global 100 ETF",
        "category": "Internacional"
      },
      {
        "id": "16",
        "code": "VEA",
        "name": "Vanguard FTSE Developed Markets ETF",
        "category": "Internacional"
      },
      {
        "id": "17",
        "code": "EFA",
        "name": "iShares MSCI EAFE ETF",
        "category": "Internacional"
      },
      {
        "id": "18",
        "code": "SCHF",
        "name": "Schwab International Equity ETF",
        "category": "Internacional"
      },
      {
        "id": "19",
        "code": "AIA",
        "name": "iShares Asia 50 ETF",
        "category": "Internacional"
      },
      {
        "id": "20",
        "code": "CWI",
        "name": "SPDR MSCI ACWI ex-US ETF",
        "category": "Internacional"
      }
    ]
    )
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
