import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indexheader',
  templateUrl: './indexheader.component.html',
  styleUrls: ['./indexheader.component.css']
})
export class IndexheaderComponent implements OnInit {
  username: string;
  userid: string;
  constructor(private apiservice: ApiService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    //this.apiservice.getUserById()
    this.route.params.subscribe(params => {
      this.userid = params['user_id'];
    });
    this.apiservice.getUserDataById(this.userid).subscribe(dataObj => {
      //console.log(dataObj.data[0].first_name);
      if(dataObj.success){
        this.username = dataObj.data[0].first_name + " " + dataObj.data[0].last_name;
      }
    });
  }

  profile_open(){
    this.router.navigate(['/setting/'+this.userid]);
  }

}
