import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  imports: [
    CommonModule,
    FormsModule // Importando o FormsModule para habilitar o ngModel
  ]
})
export class CustomSelectComponent {
  @Input() options: any[] = [];
  @Input() selectedOption: any;
  @Output() selectedOptionChange = new EventEmitter<any>();
  @Output() optionChange = new EventEmitter<any>();

  dropdownOpen = false;
  searchTerm: string = '';
  filteredOptions: any[] = [];

  constructor() {
    this.filteredOptions = this.options; // Inicializa com todas as opções
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: any) {
    debugger
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
    this.optionChange.emit(this.selectedOption);
    this.dropdownOpen = false;
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
