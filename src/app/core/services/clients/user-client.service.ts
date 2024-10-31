import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Api_Url } from './api_url';
import { IUserClient } from '../../interfaces/clients/iuser-client';

@Injectable({
  providedIn: 'root'
})
export class UserClientService {
  constructor(private http: HttpClient) { }

  userClientURL = Api_Url.URL_LOCAL;
  private UserClient: IUserClient[] = [];
  public UsersClients$: BehaviorSubject<IUserClient[]> = new BehaviorSubject<IUserClient[]>([]);

  listUsers(): Observable<IUserClient[]> {
    return this.http.get<IUserClient[]>(this.userClientURL+'/users').pipe(
      tap(users => {
        this.UserClient = users;
        this.UsersClients$.next(users);
      })
    );
  }

  // getUserById(id: string): Observable<IUserClient> {
  //   return this.http.post<IUserClient>(this.userClientURL + "get", { ID_USUARIO_CLIENTE: id });
  // }

  createUserClient(userClient: IUserClient): Observable<IUserClient[]> {
    const data = {
      ID_CLIENTE:userClient.ID_CLIENTE,
      NOMBRE: userClient.NOMBRE,
      APELLIDO: userClient.APELLIDO,
      CORREO: userClient.CORREO,
      TELEFONO: userClient.TELEFONO,
      CARGO: userClient.CARGO,
      USUARIO_DOMINIO: userClient.USUARIO_DOMINIO,
      CC: userClient.CC,
      PASSWORD: userClient.PASSWORD
    };
    return this.http.post<IUserClient[]>(this.userClientURL + "/users/insert", data).pipe(
      tap((usersClients)=>{
        this.UsersClients$.next(usersClients)
      })
    )
  }

  updateUserClient(userClient: IUserClient): Observable<IUserClient[]> {
    const data = {
      ID_USUARIO_CLIENTE: userClient.ID_USUARIO_CLIENTE,
      ID_CLIENTE: userClient.ID_CLIENTE,
      NOMBRE: userClient.NOMBRE,
      APELLIDO: userClient.APELLIDO,
      CARGO: userClient.CARGO,
      USUARIO_DOMINIO: userClient.USUARIO_DOMINIO,
      CORREO: userClient.CORREO,
      CC: userClient.CC,
      TELEFONO: userClient.TELEFONO,
    };
    return this.http.post<IUserClient[]>(this.userClientURL + "/users/update", data).pipe(
      tap((usersClients)=>{
        this.UsersClients$.next(usersClients);console.log(usersClients);
        
      })
    );
  }

  deleteUserClient(id: string): Observable<IUserClient[]> {
    return this.http.post<IUserClient[]>(this.userClientURL + "/users/delete", { ID_USUARIO_CLIENTE: id }).pipe(
      tap((usersClients)=>{
        this.UsersClients$.next(usersClients);console.log(usersClients);
        
      })
    );
  }
}
