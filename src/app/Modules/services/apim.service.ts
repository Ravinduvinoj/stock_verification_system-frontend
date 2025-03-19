import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/companyModel';
import { environment } from '../../../environments/environment';
import { Category } from '../models/categoryModel';
import { MainStore } from '../models/mainstoreModel';
import { SubStore } from '../models/substoreModule';
import { Island } from '../models/islandModel';
import { adjustStock, item } from '../models/itemModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApimService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createCompany(_data: Company) {
    return this.http.post<any>(this.baseUrl + 'company/create', _data, {
      withCredentials: true,
    });
  }

  getCompanies() {
    return this.http.get<any>(this.baseUrl + 'companies');
  }

  createCategory(_data: Category) {
    return this.http.post<any>(this.baseUrl + 'category/create', _data, {
      withCredentials: true,
    });
  }

  getCategories() {
    return this.http.get<any>(this.baseUrl + 'categories');
  }

  createMainStore(_data: MainStore) {
    return this.http.post<any>(this.baseUrl + 'mainstore/create', _data, {
      withCredentials: true,
    });
  }

  getMainstores() {
    return this.http.get<any>(this.baseUrl + 'mainstores');
  }

  createSubStore(_data: SubStore) {
    return this.http.post<any>(this.baseUrl + 'substore/create', _data, {
      withCredentials: true,
    });
  }

  getSubStores() {
    return this.http.get<any>(this.baseUrl + 'substores');
  }

  createIsland(_data: Island) {
    return this.http.post<any>(this.baseUrl + 'island/create', _data, {
      withCredentials: true,
    });
  }

  getIslands() {
    return this.http.get<any>(this.baseUrl + 'islands');
  }

  getSubstoresByMainId(_id: number) {
    return this.http.get<any>(this.baseUrl + 'substores/by/' + _id);
  }

  getItems() {
    return this.http.get<any>(this.baseUrl + 'items');
  }

  getIslandsBySubId(_id: number) {
    return this.http.get<any>(this.baseUrl + 'islands/by/' + _id);
  }

  createItem(_data: item) {
    return this.http.post<any>(this.baseUrl + 'item/create', _data, {
      withCredentials: true,
    });
  }

  getAllStocks() {
    return this.http.get<any>(this.baseUrl + 'stock/items');
  }

  adjustItemStock(_data: adjustStock) {
    return this.http.post<any>(this.baseUrl + 'stock/create', _data, {
      withCredentials: true,
    });
  }

  getLastStocksPdf(_data: any): Observable<Blob> {
    return this.http.get(this.baseUrl + '/stock/last/items/pdf', {
      params: _data,
      withCredentials: true,
      responseType: 'blob' // Ensures the response is a PDF file
    });
  }
  
}
