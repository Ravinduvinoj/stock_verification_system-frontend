import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/companyModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApimService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCompany(_data: Company) {
    return this.http.post<any>(this.baseUrl + 'company/create', _data , {withCredentials: true});
  }

  getCompanies() {
    return this.http.get<any>(this.baseUrl + 'companies');
  }
}
