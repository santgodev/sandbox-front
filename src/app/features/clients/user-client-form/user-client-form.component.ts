import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { IClient } from '../../../core/interfaces/clients/client';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserClient } from '../../../core/interfaces/clients/iuser-client';
import { UserClientService } from '../../../core/services/clients/user-client.service';

@Component({
  selector: 'app-user-client-form.component',
  templateUrl: './user-client-form.component.html',
  styleUrl: './user-client-form.component.css'
})
export class UserClientFormComponent {
  readonly EMPRESA = new FormControl('', [Validators.required,]);
  

  clients: IClient[] = [];

  errorMessage = signal('');
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUserClient,
    private userClientService:UserClientService ,
    private fb: FormBuilder,
    private clientService:ClientsService

  ) {
    this.form = this.fb.group({
        ID_USUARIO_CLIENTE: [null],
        ID_CLIENTE: ['', Validators.required],
        NOMBRE: ['', Validators.required],
        APELLIDO: ['', Validators.required],
        CARGO: ['', Validators.required],
        USUARIO_DOMINIO: ['', Validators.required],
        CORREO: ['', [Validators.required]],
        CC: ['', Validators.required],
        TELEFONO: ['', Validators.required],
        PASSWORD: [null],
        EMPRESA:[null]
  
    });
  }

  updateErrorMessage() {
    if (this.EMPRESA.hasError('required')) {
      this.errorMessage.set('Este campo es obligatorio');
    } else {
      this.errorMessage.set('');
    }
  }

  addUserClient() {
    const dataUserClient: IUserClient = this.form.getRawValue()
    this.userClientService.createUserClient(dataUserClient).subscribe()
  }

  ngOnInit(): void {
    if(this.data){
      this.form.setValue(this.data)
    }
    this.clientService.listClients().subscribe(clients=>this.clients=clients)
  }

  updateUserClient() {
    const dataUserClient: IUserClient = this.form.getRawValue()
    this.userClientService.updateUserClient(dataUserClient).subscribe()

  }
}


interface Food {
  value: string;
  viewValue: string;
}