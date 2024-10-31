import { Component, inject, TemplateRef } from '@angular/core';
import { UserClientService } from '../../../core/services/clients/user-client.service';
import { DialogService } from '../../../core/services/shared/dialog.service';
import { IUserClient } from '../../../core/interfaces/clients/iuser-client';
import { MatDialog } from '@angular/material/dialog';
import { UserClientFormComponent } from '../user-client-form/user-client-form.component';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { IClient } from '../../../core/interfaces/clients/client';
import { AssetsService } from '../../../core/services/clients/assets.service';
import { IAsset } from '../../../core/interfaces/clients/iasset';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map, Observable, startWith, tap } from 'rxjs';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-client',
  templateUrl: './user-client.component.html',
  styleUrl: './user-client.component.css'
})
export class UserClientComponent {


  clients: IClient[] = [];
  idAssetToAssing: string = '';
  idUserClientToAssing: string = '';

  userClientInfo?: IUserClient;

  usersClient: IUserClient[] = [];

  assetsByUser: IAsset[] = [];

  dataSourceFreeAsset = new MatTableDataSource<IAsset>();

  myControl = new FormControl('');
  options: IAsset[] = [];
  filteredOptions?: Observable<IAsset[]>;

  
  constructor(
    public userClientService: UserClientService,
    private dialogService: DialogService,
    public assetService: AssetsService,


  ) { }
  ngOnInit(): void {
    this.userClientService.listUsers().subscribe((userClientArray) => { console.log(userClientArray); })
    this.assetService.listFreeAssets().subscribe((freeAssets) => {
      this.dataSourceFreeAsset.data = freeAssets


      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      
    })

      

  }
  private _filter(value: string): IAsset[]{
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.NOMBRE_ACTIVO.toLowerCase().includes(filterValue));
  }



  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'CARGO', 'USUARIO_DOMINIO', 'CORREO', 'CC', 'TELEFONO', 'OPERACIONES'];

  idUserClientForDelete!: string
  readonly dialog = inject(MatDialog);

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserClientFormComponent);
    dialogRef.afterClosed().subscribe();
  }


  openDialogDelete(template: TemplateRef<any>, ID_USUARIO_CLIENTE: string) {
    console.log(ID_USUARIO_CLIENTE);

    this.idUserClientForDelete = ID_USUARIO_CLIENTE;
    this.dialogService.openDialogWithTemplate({ template }).afterClosed().subscribe(() => {
      this.idUserClientForDelete = '';
    })
  }
  openClientFormUpdate(data: IUserClient) {

    this.dialogService.openUserClientFormDialog(data).afterClosed().subscribe(() => {
    })
  }
  onDelete() {
    this.userClientService.deleteUserClient(this.idUserClientForDelete).subscribe();
  }


  openAssingDevideform(template: TemplateRef<any>, idUserClient: string) {
    this.idUserClientToAssing = idUserClient
    this.dialogService.openDialogWithTemplate({ template })
  }
  openUserClientInfo(template: TemplateRef<any>, userClient: IUserClient) {
    this.assetService.listAssetsByUserClientId(userClient.ID_USUARIO_CLIENTE).subscribe(
      (assetsByUser) => { this.assetsByUser = assetsByUser })
    this.userClientInfo = userClient;
    this.dialogService.openDialogWithTemplate({ template })
   

  }



  saveIdasset(idAsset: string) {
    this.idAssetToAssing = idAsset
  }
  saveIdUserClient(idUserClient: string) {
    this.idUserClientToAssing = idUserClient
  }
  assingUserToAsset() {
    this.assetService.assigUserToAsset(this.idAssetToAssing, this.idUserClientToAssing).subscribe((assets) => {
      this.dataSourceFreeAsset.data = assets;
    })
  }
  undessingDevice(idAsset:string){
    let idUser=null;
    this.assetService.assigUserToAsset(idAsset,idUser).subscribe(
      ()=>{ this.assetService.listAssetsByUserClientId(this.idUserClientToAssing).subscribe(
        (assets)=>{this.assetsByUser=assets}
      )}
    )
  }

  
  applyFilterAssetsAssigUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFreeAsset.filter = filterValue.trim().toLowerCase();
    
  }

}
