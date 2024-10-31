import { Component, inject, TemplateRef } from '@angular/core';
import { IAsset } from '../../../core/interfaces/clients/iasset';
import { MatTableDataSource } from '@angular/material/table';
import { AssetsService } from '../../../core/services/clients/assets.service';
import { DialogService } from '../../../core/services/shared/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetFormComponent } from '../asset-form/asset-form.component';
import { switchMap } from 'rxjs';
import { IDesigDevice } from '../../../core/interfaces/clients/iassigDevice';
import { UserClientService } from '../../../core/services/clients/user-client.service';
import { IUserClient } from '../../../core/interfaces/clients/iuser-client';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {
  idAssetforDelete: string = '';


  constructor(
    private assetService: AssetsService,
    private dialogService: DialogService,


  ) { }


  displayedColumns: string[] = ['ID_ACTIVO', 'NOMBRE_ACTIVO', 'CATEGORIA', 'MARCA', 'REFERENCIA', 'SERIAL', 'ESTADO', 'NOVEDADES', 'OPERACIONES'];


  dataSource = new MatTableDataSource<IAsset>();





  ngOnInit(): void {
    this.assetService.listAssets().subscribe((assets) => {
      this.dataSource.data = assets;

    })
   
  }

  readonly dialog = inject(MatDialog);

  openCreateDialog() {
    const dialogRef = this.dialog.open(AssetFormComponent);
    dialogRef.afterClosed().pipe(
      switchMap(() => { return this.assetService.listAssets() })
    ).subscribe((assets) => {
      this.dataSource.data = assets
    });
  }
  openDialogDelete(template: TemplateRef<any>, ID_ACTIVO: string) {
    this.idAssetforDelete = ID_ACTIVO;
    this.dialogService.openDialogWithTemplate({ template }).afterClosed().subscribe(() => {
      this.idAssetforDelete = '';
    })
  }
  onDeleteAssets() {
    this.assetService.deleteAsset(this.idAssetforDelete).subscribe(
      (assets) => { this.dataSource.data = assets }
    );

  }
  openAssetFormUpdate(data: IAsset) {
    this.dialogService.openAssetFormDialog(data).afterClosed().pipe(
      switchMap(() => { return this.assetService.listAssets() })
    ).subscribe((assets) => {
      this.dataSource.data = assets
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}


