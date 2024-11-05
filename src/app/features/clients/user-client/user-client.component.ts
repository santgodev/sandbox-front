import { Component, inject, TemplateRef, OnDestroy } from '@angular/core';
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
import { filter, map, Observable, startWith, tap, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-client',
  templateUrl: './user-client.component.html',
  styleUrls: ['./user-client.component.css']
})
export class UserClientComponent implements OnDestroy {

  clients: IClient[] = [];
  idAssetToAssing: string = '';
  userClientInfo!: IUserClient;
  myControl = new FormControl('');
  listAssetsByUser: IAsset[] = [];
  assetsByUser: IAsset[] = [];
  AssetsForFilter: IAsset[] = [];
  assetsSelects$?: Observable<IAsset[]>;
  displayedColumns2: string[] = ['nombre', 'serial', 'novedades', 'referencia', 'acciones'];
  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'CARGO', 'USUARIO_DOMINIO', 'CORREO', 'CC', 'TELEFONO', 'OPERACIONES'];
  idUserClientForDelete!: string;
  private readonly destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog);

  constructor(
    public userClientService: UserClientService,
    private dialogService: DialogService,
    public assetService: AssetsService
  ) { }

  ngOnInit(): void {
    this.userClientService.listUsers().pipe(takeUntil(this.destroy$)).subscribe();

    this.assetsSelects$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): IAsset[] {
    const filterValue = value.toLowerCase();
    return this.AssetsForFilter.filter(assetByUser => assetByUser.SERIAL.toLowerCase().includes(filterValue));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserClientFormComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  openDialogDelete(template: TemplateRef<any>, ID_USUARIO_CLIENTE: string) {
    this.idUserClientForDelete = ID_USUARIO_CLIENTE;
    this.dialogService.openDialogWithTemplate({ template }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.idUserClientForDelete = '';
    });
  }

  openClientFormUpdate(data: IUserClient) {
    this.dialogService.openUserClientFormDialog(data).afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }

  onDelete() {
    this.userClientService.deleteUserClient(this.idUserClientForDelete).pipe(takeUntil(this.destroy$)).subscribe();
  }

  openUserClientInfo(template: TemplateRef<any>, userClient: IUserClient) {
    this.userClientInfo = userClient;
    this.assetService.listAssetsByUserClientId(userClient.ID_USUARIO_CLIENTE)
      .pipe(takeUntil(this.destroy$))
      .subscribe(assetsByUser => this.listAssetsByUser = assetsByUser);

    this.assetService.listFreeAssets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(freeAssets => { this.AssetsForFilter = freeAssets; });

    this.dialogService.openDialogWithTemplate({ template });
  }

  assingUserToAsset() {
    this.assetService.assigUserToAsset(this.idAssetToAssing, this.userClientInfo.ID_USUARIO_CLIENTE)
      .pipe(takeUntil(this.destroy$))
      .subscribe(assetsByUser => this.listAssetsByUser = assetsByUser);

    this.assetService.listFreeAssets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(freeAssets => { this.AssetsForFilter = freeAssets; });

    this.myControl.reset();
  }

  saveAssets(asset: IAsset) {
    this.idAssetToAssing = asset.ID_ACTIVO;
  }

  undessingDevice(idAsset: string) {
    this.assetService.undessingUserToAsset(idAsset)
      .pipe(takeUntil(this.destroy$))
      .subscribe(freeAssets => {
        this.AssetsForFilter = freeAssets; 
        this.assetService.listAssetsByUserClientId(this.userClientInfo.ID_USUARIO_CLIENTE)
          .pipe(takeUntil(this.destroy$))
          .subscribe(assetsByUser => this.listAssetsByUser = assetsByUser);
      });



    this.myControl.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
