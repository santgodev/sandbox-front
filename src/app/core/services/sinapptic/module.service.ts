import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModulo } from '../../interfaces/sinapptic/modulo';
import { Api_Url } from './api_url';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private URL = Api_Url.URL_LOCAL
  constructor(private http: HttpClient) { }

  getModules(): Observable<IModulo[]> {
    return this.http.get<IModulo[]>(this.URL+'/modules_components')
  }
}
