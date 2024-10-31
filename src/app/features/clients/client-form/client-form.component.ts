import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { IClient } from '../../../core/interfaces/clients/client';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'client-form.component',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  readonly EMPRESA = new FormControl('', [Validators.required,]);


  errorMessage = signal('');
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IClient,
    private clientsService: ClientsService,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      ID_CLIENTE:[null],
      NOMBRE_CLIENTE: ['', Validators.required],
      NIT: ['', Validators.required],
      TELEFONO: ['', Validators.required],
      DIRECCION: ['', Validators.required],
      INFORMACION: ['', Validators.required],
      COLOR_BOTON:[null],
    });
  }

  updateErrorMessage() {
    if (this.EMPRESA.hasError('required')) {
      this.errorMessage.set('Este campo es obligatorio');
    } else {
      this.errorMessage.set('');
    }
  }

  addClient() {
    const dataClient: IClient = this.form.getRawValue()
    this.clientsService.createClient(dataClient).subscribe()
  }
  ngOnInit(): void {
    if(this.data){
      this.form.setValue(this.data)
    }
    console.log(this.form.value);
    

  }
  updateClient() {
    const dataClient: IClient = this.form.getRawValue()
    this.clientsService.updateClient(dataClient).subscribe()

  }
}
