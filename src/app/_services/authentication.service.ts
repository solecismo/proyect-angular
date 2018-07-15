import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private permissionsService: NgxPermissionsService) { }

    login(email: string, password: string) {
        
        let headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+btoa(email+':'+password)
        });

        const params = new HttpParams().set('access_token', 'koh83JGFCpfjyE9dZcHMlDBkXvlnACkX');         

        return this.http.post<any>(environment.apiUrl+'/auth', params, {headers: headers} )
            .pipe(map((res:any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email, token: res.token }));
                    //assign role
                    const perm = [res.user.role.toString().toUpperCase()];
                    this.permissionsService.loadPermissions(perm);
                }
            }) );
    }

    logout() {
        //remove role
        this.permissionsService.flushPermissions();
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}