import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../components/users/interface/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const url = `${environment.URL}/users/`;
    return this.http.get<User[]>(url);
  }

  saveData(data: User) {
    const url = `${environment.URL}/users/`;
    return this.http.post(url, data);
  }

  actData(data: User, id: number) {
    const url = `${environment.URL}/users/${id}`;
    return this.http.put(url, data);
  }
}
