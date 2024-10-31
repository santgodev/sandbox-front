import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { IClient } from '../../../core/interfaces/clients/client';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssetsService } from '../../../core/services/clients/assets.service';
import { IAsset } from '../../../core/interfaces/clients/iasset';

@Component({
  selector: 'asset-form.component',
  templateUrl: './asset-form.component.html',
  styleUrl: './asset-form.component.css'
})
export class AssetFormComponent {
  readonly EMPRESA = new FormControl('', [Validators.required,]);


  errorMessage = signal('');
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAsset,
    private assetService: AssetsService,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      ID_ACTIVO: [null],
      ID_USUARIO_CLIENTE: [null],
      NOMBRE_ACTIVO: ['', Validators.required],
      CATEGORIA: ['', Validators.required],
      MARCA: ['', Validators.required],
      REFERENCIA: ['', Validators.required],
      SERIAL: ['', Validators.required],
      ESTADO: [null],
      NOVEDADES: ['', Validators.required],
    });
  }

  updateErrorMessage() {
    if (this.EMPRESA.hasError('required')) {
      this.errorMessage.set('Este campo es obligatorio');
    } else {
      this.errorMessage.set('');
    }
  }

  addAsset() {
    const dataAsset: IAsset = this.form.getRawValue()
    this.assetService.createAsset(dataAsset).subscribe()
  }
  ngOnInit(): void {
    if(this.data){
      this.form.setValue(this.data)
    }
    console.log(this.form.value);
    

  }
  updateAsset() {
    const dataAsset: IAsset = this.form.getRawValue()
    this.assetService.updateAsset(dataAsset).subscribe()

  }

}
