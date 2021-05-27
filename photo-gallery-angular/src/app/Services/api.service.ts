import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

const apiUrl = 'http://127.0.0.1:9000/home'
const authUrl = 'http://127.0.0.1:9000/home/auth'

interface ResponseData{
  success: boolean,
  msg: string,
  data: object
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUser(){
    return this.httpClient.get(apiUrl);
  }
  getUserDataById(id: string){
    return this.httpClient.get<ResponseData>(apiUrl+"/"+id);
  }
  postPhotoById(u_id: string,payload: string,file:File){
    const formdata = new FormData();
    formdata.append('image',file);
    formdata.append('caption',payload);
    return this.httpClient.post<ResponseData>(apiUrl+"/"+u_id+"/"+"image",formdata);
  }
  deletePhotoById(p_id: string){
    return this.httpClient.delete<ResponseData>(apiUrl+"/image/"+p_id);
  }
  postUser(payload: Object){
    return this.httpClient.post<ResponseData>(apiUrl,payload);
  }
  authUser(payload: Object){
    return this.httpClient.post<ResponseData>(authUrl,payload);
  }
  updateUser(u_id:string,payload: Object){
    return this.httpClient.patch<ResponseData>(apiUrl+"/"+u_id,payload);
  }
  deleteuser(u_id: string){
    return this.httpClient.delete<ResponseData>(apiUrl+"/"+u_id);
  }
}
