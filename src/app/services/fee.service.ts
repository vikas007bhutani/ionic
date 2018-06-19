import { Injectable, Inject } from '@angular/core';
import { Http, Response,RequestOptions,Headers} from '@angular/http';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { ServiceBase } from './serviceBase';

import {ifeemodle,iclassmodel, iupdaterequest } from '../models/feeAllocationModel';

const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'q= 0.8;application / json; q = 0.9');
		headers.append('SchoolID', '1');
		headers.append('UserName', 'Account');
		headers.append("Authorization", "Basic " + btoa('Account' + ":" + 'password')); 
		
const options = new RequestOptions({headers:headers});
@Injectable()
export class FeeService extends ServiceBase {
  private baseurl: string=`${environment.api_url}`;
	constructor( @Inject(Http) public http: Http, private route: Router) {
		super(http,route)
	this.http=http;
	}
	getItems(selectedclass): Observable<ifeemodle[]> { 
		let URL=`${this.baseurl}api/FeesAllocation/Getfeedata?schoolId=${this.getSchoolId()}&classid=${selectedclass}`;
		return  this.http.get(URL,options).map((res: Response) => res.json() ).catch(this.handleError);
	 }
	private handleError(error: any) {
	
		let errMsg = (error.message) ? error.message :
			error.status ? '${error.status} - ${error.statusText}' : 'Server error';
		console.error("start");
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
	private extractData(res: Response) {        
		return res.text() ? res.json() : {}; ;
	}
	
	getclasses(): Observable<iclassmodel[]> {
		return  this.http.get(this.baseurl +'api/Common/Classes',options).map((res: Response) => res.json() ).catch(this.handleErrorclass); }
		private handleErrorclass(error: any) {
      
			let errMsg = (error.message) ? error.message :
				error.status ? '${error.status} - ${error.statusText}' : 'Server error';
			console.error("start");
			console.error(errMsg); // log to console instead
			return Observable.throw(errMsg);
	}
	
	UpdateFeeAllocation(body): Observable<any> {
		// body.schoolId = this.getSchoolId();
		// body.feelist = body
		//let apiUrl = this.baseurl + 'api/FeesAllocation/updateAllocateFees';
		return  this.http.post(this.baseurl +'api/FeesAllocation/updateAllocateFees',body,options).map((res: Response) => res.json() ).catch(this.handleErrorclass); }
		private handleErrorupdate(error: any) {
		
			let errMsg = (error.message) ? error.message :
				error.status ? '${error.status} - ${error.statusText}' : 'Server error';
			console.error("start");
			console.error(errMsg); // log to console instead
			return Observable.throw(errMsg);
	
	  }

}
