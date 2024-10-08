import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { ProductService } from '../../services/product.service'

interface ProductData {
  code: string;
  name: string;
  category: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule, MatDialogModule]
})
export class ProductFormComponent {
  productForm: FormGroup
  categories: string[]
  submitAttempted = false
  isEditing: boolean

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductData | null
  ) {
    this.categories = this.productService.getCategories()
    this.isEditing = !!data?.code

    this.productForm = this.fb.group({
      code: [
        { value: data?.code || '', disabled: this.isEditing },
        [Validators.required],
        this.isEditing ? [] : [this.codeValidator()]
      ],
      name: [data?.name || '', Validators.required],
      category: [data?.category || '', Validators.required]
    })
  }

  codeValidator() {
    return (control: AbstractControl<string | null>): Observable<ValidationErrors | null> => {
      if (control.value === null) {
        return of(null)
      }
      return this.productService.checkCodeExists(control.value).pipe(
        map(exists => exists ? { codeTaken: true } : null)
      )
    }
  }

  onSave(): void {
    this.submitAttempted = true;
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.productForm.getRawValue(),
        code: this.productForm.get('code')?.value.toUpperCase()
      };
      this.dialogRef.close(updatedProduct);
    }
  }


  onCancel(): void {
    this.dialogRef.close()
  }
}
