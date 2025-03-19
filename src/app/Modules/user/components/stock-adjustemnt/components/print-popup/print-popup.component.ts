import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-popup',
  templateUrl: './print-popup.component.html',
  styleUrl: './print-popup.component.css'
})
export class PrintPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PrintPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
