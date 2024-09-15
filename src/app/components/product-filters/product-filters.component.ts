// import { Component, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-product-filters',
//   templateUrl: './product-filters.component.html',
//   styleUrls: ['./product-filters.component.scss']
// })


import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Adicione FormsModule

@Component({
  selector: 'app-product-filters',
  standalone: true,
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  imports: [CommonModule, FormsModule] // Certifique-se de adicionar FormsModule aqui
})
export class ProductFiltersComponent {
  categories = [
    { label: 'Todos', value: 'todos' },
    { label: 'Varejo', value: 'Varejo' },
    { label: 'Atacado', value: 'Atacado' },
    { label: 'Internacional', value: 'Internacional' }
  ];

  searchCode: string = ''; // Propriedade de input para código
  selectedCategory: string = 'todos'; // Propriedade de categoria selecionada

  // Output para emitir o evento de filtro para o componente pai
  @Output() filterChange = new EventEmitter<{ code: string; category: string }>();

  // Método para selecionar a categoria e emitir o evento de filtro
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  // Método para limpar o filtro e emitir o evento de filtro
  clearFilter() {
    this.searchCode = '';
    this.selectedCategory = 'todos';
    this.filterProducts();
  }

  // Método para filtrar os produtos baseado no código e na categoria
  filterProducts() {
    this.filterChange.emit({
      code: this.searchCode,
      category: this.selectedCategory
    });
  }
}
