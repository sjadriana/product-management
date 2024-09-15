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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categories = this.productService.getCategories()
    this.isEditing = !!data.code

    this.productForm = this.fb.group({
      code: [
        { value: data.code || '', disabled: this.isEditing },
        [Validators.required, Validators.pattern(/^\d+$/)],
        this.isEditing ? [] : [this.codeValidator()]
      ],
      name: [data.name || '', Validators.required],
      category: [data.category || '', Validators.required]
    })
  }

  codeValidator() {
    return (control: AbstractControl<any, any> | null): Observable<ValidationErrors | null> => {
      if (!control) {
        return of(null)
      }
      return this.productService.checkCodeExists(control.value).pipe(
        map(exists => exists ? { codeTaken: true } : null)
      )
    }
  }

  onSave(): void {
    this.submitAttempted = true
    if (this.productForm.valid) {
      const codeControl = this.productForm.get('code')
      const nameControl = this.productForm.get('name')
      const categoryControl = this.productForm.get('category')

      if (codeControl) {
        codeControl.updateValueAndValidity()
      }
      if (nameControl) {
        nameControl.updateValueAndValidity()
      }
      if (categoryControl) {
        categoryControl.updateValueAndValidity()
      }
      if (this.productForm.valid) {
        this.dialogRef.close(this.productForm.value)
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
