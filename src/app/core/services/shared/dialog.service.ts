import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogWithTemplate } from '../../interfaces/shared/idialog-data';
import { ClientFormComponent } from '../../../features/clients/client-form/client-form.component';
import { DialogCustomComponent } from '../../../shared/dialog-custom/dialog-custom.component';
import { IClient } from '../../interfaces/clients/client';
import { IUserClient } from '../../interfaces/clients/iuser-client';
import { UserClientFormComponent } from '../../../features/clients/user-client-form/user-client-form.component';
import { IAsset } from '../../interfaces/clients/iasset';
import { AssetFormComponent } from '../../../features/clients/asset-form/asset-form.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog:MatDialog) { }

  openDialogWithTemplate(data:IDialogWithTemplate){
    return this.matDialog.open(DialogCustomComponent, {data})
  }

  openClientFormDialog(data:IClient){
    return this.matDialog.open(ClientFormComponent, {data})
  }
  openUserClientFormDialog(data:IUserClient){
    return this.matDialog.open(UserClientFormComponent, {data})
  }
  openAssetFormDialog(data:IAsset){
    return this.matDialog.open(AssetFormComponent, {data})
  }
 
}
