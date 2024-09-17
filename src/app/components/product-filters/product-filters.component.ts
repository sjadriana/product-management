import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // Adicionado

@Component({
  selector: 'app-product-filters',
  standalone: true,
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule] // Incluído o MatInputModule
})
export class ProductFiltersComponent {
  categories = [
    { label: 'Todos', value: 'todos' },
    { label: 'Varejo', value: 'Varejo' },
    { label: 'Atacado', value: 'Atacado' },
    { label: 'Internacional', value: 'Internacional' }
  ];

  searchCode = '';
  selectedCategory = 'todos';

  @Output() filterChange = new EventEmitter<{ code: string; category: string }>();

  filterProducts() {
    this.filterChange.emit({
      code: this.searchCode,
      category: this.selectedCategory
    });
  }

  clearFilter() {
    this.searchCode = '';
    this.selectedCategory = 'todos';
    this.filterProducts();
  }
}
