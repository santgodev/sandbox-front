import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IClient } from '../../interfaces/clients/client';
import { Api_Url } from './api_url';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private URL = Api_Url.URL_LOCAL
  private clients: IClient[] = [];
  public clients$: BehaviorSubject<IClient[]> = new BehaviorSubject<IClient[]>([]);

  constructor(private http: HttpClient) {}

  listClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.URL).pipe(
      tap((clients) => {
        this.clients$.next(clients);
      })
    );
  }

  createClient(client: IClient): Observable<IClient[]> {
    const data = {
      NOMBRE_CLIENTE: client.NOMBRE_CLIENTE,
      NIT: client.NIT,
      TELEFONO: client.TELEFONO,
      DIRECCION: client.DIRECCION,
      INFORMACION: client.INFORMACION,
    };
    return this.http.post<IClient[]>(this.URL + '/insert', data).pipe(
      tap((clients) => {
        this.clients$.next(clients);
      })
    );
  }

  deleteClient(id: string): Observable<IClient[]> {
    const data = { ID_CLIENTE: id };
    return this.http.post<IClient[]>(this.URL + '/delete', data).pipe(
      tap((clients) => {
        this.clients$.next(clients);
      })
    );
  }
  updateClient(client: IClient): Observable<IClient[]> {
    const data = {
      ID_CLIENTE:client.ID_CLIENTE,
      NOMBRE_CLIENTE: client.NOMBRE_CLIENTE,
      NIT: client.NIT,
      TELEFONO: client.TELEFONO,
      DIRECCION: client.DIRECCION,
      INFORMACION: client.INFORMACION,
    };
    return this.http.post<IClient[]>(this.URL + '/update', data).pipe(
      tap((clients) => {
        this.clients$.next(clients);
      })
    );
  }
}


