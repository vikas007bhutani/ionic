import { Injectable } from '@angular/core';
import { ServiceBase } from './serviceBase';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService extends ServiceBase {

  private baseurl: string = `${environment.api_url}`;
  constructor(private http: Http, private route: Router) {
    super(http, route);
  }

  getAllStudents(pageIndex, pageSize): Observable<any> {
    var url = this.baseurl + `api/UserAccount/GetAllStudents?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.makeGetCall(url);
  }

  getAllStaffs(pageIndex, pageSize): Observable<any> {
    var url = this.baseurl + `api/UserAccount/GetAllStaff?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.makeGetCall(url);
  }

  getUserProfile(userId: number) {
    var url = this.baseurl + `api/UserAccount/ProfileDetail?userId=${userId}`;
    return this.makeGetCall(url);
  }

  getPaymentUsers(query): Observable<any> {
    var userRoleId = 4;
    var url = this.baseurl + `api/Common/UsersAutoCompletePaymentUsers?schoolId=${this.getSchoolId()}&userRoleId=${userRoleId}&userSearchString=${query}`;
    return this.makeGetCall(url);
  }
}
