import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import University from 'src/app/interfaces/university';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  ROOT_URL = 'http://universities.hipolabs.com';
  constructor(private http: HttpClient) {}

  getUniversityByCountry(country: string): Observable<University[]> {
    const params: HttpParams = new HttpParams().set('country', country);
    return this.http
      .get<University[]>(this.ROOT_URL + '/search', {
        ...(country.trim() && { params }),
      })
      .pipe(tap((x: University[]) => x.splice(40)));
  }

  searchUniversityByName(name: string): Observable<University[]> {
    const params: HttpParams = new HttpParams().set('name', name);
    return this.http
      .get<University[]>(this.ROOT_URL + '/search', {
        ...(name.trim() && { params }),
      })
      .pipe(tap((x: University[]) => x.splice(40)));
  }
}
