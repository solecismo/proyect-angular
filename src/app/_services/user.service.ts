import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../_models';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(environment.apiUrl+'/users');
    }
    
    getUserById(id:string){
        return this.http.get<User[]>(environment.apiUrl+'/users/'+id);
    }

    postCreateUser(email: string, password: string){
        
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const params = new HttpParams()
            .set('access_token', 'koh83JGFCpfjyE9dZcHMlDBkXvlnACkX')         
            .set('email', email)         
            .set('password', password);         

        return this.http.post<any>(environment.apiUrl+'/users', params, {headers: headers} );
    }

    
}