import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-product-filters',
  standalone: true,
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ProductFiltersComponent {
  categories = [
    { label: 'Todos', value: 'todos' },
    { label: 'Varejo', value: 'Varejo' },
    { label: 'Atacado', value: 'Atacado' },
    { label: 'Internacional', value: 'Internacional' }
  ]

  searchCode = ''
  selectedCategory = 'todos'

  @Output() filterChange = new EventEmitter<{ code: string; category: string }>()

  ngOnInit() {
    this.clearFilter()
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.filterProducts()
  }

  clearFilter() {
    this.searchCode = ''
    this.selectedCategory = 'todos'
    this.filterProducts()
  }

  filterProducts() {
    this.filterChange.emit({
      code: this.searchCode,
      category: this.selectedCategory
    })
  }
}
