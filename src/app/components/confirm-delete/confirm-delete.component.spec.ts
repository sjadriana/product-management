import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ConfirmDeleteComponent } from './confirm-delete.component'
import { MatDialogModule } from '@angular/material/dialog'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteComponent
  let fixture: ComponentFixture<ConfirmDeleteComponent>
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDeleteComponent>>

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close'])

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatDialogModule, MatButtonModule, ConfirmDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { code: '123' } }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ConfirmDeleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call dialogRef.close with true on confirm', () => {
    component.onConfirm()
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true)
  })

  it('should call dialogRef.close with false on cancel', () => {
    component.onCancel()
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false)
  })
})
