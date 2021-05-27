import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  User  from 'src/app/Models/user';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform: FormGroup;
  user = new User('', '', '', '');
  msgExtra: string;
  success: boolean;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.signupform = new FormGroup({
      'firstname': new FormControl(null,[Validators.required]),
      'lastname': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    });
  }
  register_user(){

    this.apiService.postUser(this.user).subscribe(dataObj => {
      this.success = dataObj.success;
      this.msgExtra = dataObj.msg;
      if(dataObj.success){
        this.signupform.reset();
      }
    });

  }

}
