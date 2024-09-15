import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, MatDialogModule]
})
export class ProductFormComponent {
  productForm: FormGroup;
  categories: string[];
  submitAttempted = false;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categories = this.productService.getCategories();
    this.isEditing = !!data.code;

    this.productForm = this.fb.group({
      code: [
        { value: data.code || '', disabled: this.isEditing }, // Desabilitado no modo edição
        [Validators.required, Validators.pattern(/^\d+$/)],
        this.isEditing ? [] : [this.codeValidator()] // Validação apenas no modo de criação
      ],
      name: [data.name || '', Validators.required],
      category: [data.category || '', Validators.required]
    });
  }

  // Validador assíncrono para verificar se o código já existe
  codeValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.productService.checkCodeExists(control.value).pipe(
        map(exists => exists ? { codeTaken: true } : null)
      );
    };
  }

  onSave(): void {
    this.submitAttempted = true;
    if (this.productForm.valid) {
      this.productForm.get('code')?.updateValueAndValidity(); // Atualiza a validade do campo code
      this.productForm.get('name')?.updateValueAndValidity(); // Atualiza a validade do campo name
      this.productForm.get('category')?.updateValueAndValidity(); // Atualiza a validade do campo category

      // Se o formulário é válido após a atualização, fecha o diálogo com os valores
      if (this.productForm.valid) {
        this.dialogRef.close(this.productForm.value);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
