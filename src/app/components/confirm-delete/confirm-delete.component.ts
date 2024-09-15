import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { MatDialogModule } from '@angular/material/dialog'; // Importar MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule] // Importar módulos necessários
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: number }
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
