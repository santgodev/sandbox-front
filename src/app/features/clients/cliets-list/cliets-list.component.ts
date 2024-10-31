import { Component,  inject, TemplateRef, } from '@angular/core';
import { IClient } from '../../../core/interfaces/clients/client';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import {  MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../../core/services/shared/dialog.service';

@Component({
  selector: 'app-cliets-list',
  templateUrl: './cliets-list.component.html',
  styleUrl: './cliets-list.component.css'
})
export class ClietsListComponent  {
  displayedColumns: string[] = ['EMPRESA', 'NIT', 'TELEFONO', 'DIRECCION', 'INFORMACION', 'OPERACIONES'];
  idClienteForDelete!:string

constructor(
  public clientsService:ClientsService,
  public dialogService:DialogService
) {
  clientsService.listClients().subscribe((dataClients)=>{console.log(dataClients);
  });
}
readonly dialog = inject(MatDialog);

  openCreateDialog() {
    const dialogRef = this.dialog.open(ClientFormComponent);
    dialogRef.afterClosed().subscribe();
  }

  openDialogDelete(template:TemplateRef<any>, ID_CLIENTE:string){
    this.idClienteForDelete=ID_CLIENTE; 
    this.dialogService.openDialogWithTemplate({template}).afterClosed().subscribe(()=>{
      this.idClienteForDelete=''; 
    })
  }

  onDelete(){    
    this.clientsService.deleteClient(this.idClienteForDelete).subscribe();
  }
  openClientFormUpdate(data:IClient){
    this.dialogService.openClientFormDialog(data).afterClosed().subscribe(()=>{
    })
  }

}
