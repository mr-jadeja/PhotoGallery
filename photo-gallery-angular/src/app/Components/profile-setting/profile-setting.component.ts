import User  from 'src/app/Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  userid: string;
  user: User;
  profileform: FormGroup;
  msgExtra: string;
  success: boolean;
  constructor(private apiservice: ApiService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['user_id'];
    });

    this.apiservice.getUserDataById(this.userid).subscribe(dataObj => {
      if(dataObj.success){
        console.log(dataObj.data[0]);
        this.user = new User(dataObj.data[0].first_name,dataObj.data[0].last_name, dataObj.data[0].email_id,dataObj.data[0].password);

        // this.username = dataObj.data[0].first_name + " " + dataObj.data[0].last_name;
      }
    });
    this.profileform = new FormGroup({
      'firstname': new FormControl(null,[Validators.required]),
      'lastname': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    });

  }
  updateuser(){
    this.apiservice.updateUser(this.userid,this.user).subscribe(dataObj => {
      this.msgExtra = dataObj.msg;
      this.success = dataObj.success;
    });
  }

  deleteuser(){
    if(window.confirm("Are you sure you want to delete your account ?")){
      this.apiservice.deleteuser(this.userid).subscribe(userObj => {
        if(userObj.success){
          console.log("deleted");
          this.router.navigate(['/signin/']);
        }
      });
    }
  }


}
