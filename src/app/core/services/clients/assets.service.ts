import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Api_Url } from './api_url';
import { IAsset } from '../../interfaces/clients/iasset';
import { IDesigDevice } from '../../interfaces/clients/iassigDevice';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private URL = Api_Url.URL_LOCAL;
  public assets$: BehaviorSubject<IAsset[]> = new BehaviorSubject<IAsset[]>([]);
  public assetsByUser$: BehaviorSubject<IAsset[]> = new BehaviorSubject<IAsset[]>([]);
  public freeAssets$: BehaviorSubject<IAsset[]> = new BehaviorSubject<IAsset[]>([]);

  constructor(private http: HttpClient) { }

  listAssets(): Observable<IAsset[]> {
    return this.http.get<IAsset[]>(this.URL + '/assets').pipe(
      tap((assets) => {
        this.assets$.next(assets);
      })
    );
  } 
  listFreeAssets(): Observable<IAsset[]> {
    return this.http.get<IAsset[]>(this.URL + '/assets/free').pipe(
      tap((assets) => {
        this.freeAssets$.next(assets);
      })
    );
  }

  listAssetsByUserClientId(id: string): Observable<IAsset[]> {
    const data = { ID_USUARIO_CLIENTE: id }
    return this.http.post<IAsset[]>(this.URL + '/assets/listbyuserid', data).pipe(
      tap((assets) => {
        this.assetsByUser$.next(assets);
      })
    );
  }

  createAsset(activo: IAsset): Observable<IAsset[]> {
    const data = {
      ID_USUARIO: activo.ID_USUARIO_CLIENTE,
      NOMBRE_ACTIVO: activo.NOMBRE_ACTIVO,
      CATEGORIA: activo.CATEGORIA,
      MARCA: activo.MARCA,
      REFERENCIA: activo.REFERENCIA,
      SERIAL: activo.SERIAL,
      ESTADO: activo.ESTADO,
      NOVEDADES: activo.NOVEDADES,
    };
    return this.http.post<IAsset[]>(this.URL + '/assets/insert', data).pipe(
      tap((assets) => {
        this.assets$.next(assets);
      })
    );
  }

  deleteAsset(id: string): Observable<IAsset[]> {
    const data = { ID_ACTIVO: id }; // Cambiar según el identificador correcto
    return this.http.post<IAsset[]>(this.URL + '/assets/delete', data).pipe(
      tap((assets) => {
        this.assets$.next(assets);
      })
    );
  }

  updateAsset(activo: IAsset): Observable<IAsset[]> {
    const data = {
      ID_ACTIVO: activo.ID_ACTIVO,
      NOMBRE_ACTIVO: activo.NOMBRE_ACTIVO,
      CATEGORIA: activo.CATEGORIA,
      MARCA: activo.MARCA,
      REFERENCIA: activo.REFERENCIA,
      SERIAL: activo.SERIAL,
      ESTADO: activo.ESTADO,
      NOVEDADES: activo.NOVEDADES,
    };
    return this.http.put<IAsset[]>(this.URL + '/assets/update', data).pipe(
      tap((assets) => {
        this.assets$.next(assets);
      })
    );
  }

  assigUserToAsset(idAsset:string,idUserClient:string  ): Observable<IAsset[]> {
    let data = {
      ID_ACTIVO: idAsset,
      ID_USUARIO_CLIENTE: idUserClient
    }
    return this.http.put<IAsset[]>(this.URL+'/assets/assinguser', data).pipe(
      tap((assetByUser)=>{
        this.assetsByUser$.next(assetByUser)
      })
    )
  }

  undessingUserToAsset(idAsset:string): Observable<IAsset[]> {
    let data = {
      ID_ACTIVO: idAsset,
    }
    return this.http.put<IAsset[]>(this.URL+'/assets/undessinguser', data).pipe(
      tap((freeAssets)=>{
        this.freeAssets$.next(freeAssets)
      })
    )
  }
}
