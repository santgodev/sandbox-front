import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogWithTemplate } from '../../core/interfaces/shared/idialog-data';

@Component({
  selector: 'app-dialog-custom',
  templateUrl: './dialog-custom.component.html',
  styleUrl: './dialog-custom.component.css'
})
export class DialogCustomComponent {
constructor(@Inject(MAT_DIALOG_DATA)public data:IDialogWithTemplate){}


}
