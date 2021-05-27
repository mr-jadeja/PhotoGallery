import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/Models/user';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinform: FormGroup;
  user = new User('','','','');
  msgExtra: string;
  success: boolean;
  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    this.signinform = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    });
  }

  login(){
    this.apiService.authUser(this.user).subscribe(dataObj => {
      this.msgExtra = dataObj.msg;
      this.success = dataObj.success;
      if(this.success){
        console.log(dataObj.data[0]._id);
        this.router.navigate(['/home/'+dataObj.data[0]._id]);
      }
    });
  }

}
