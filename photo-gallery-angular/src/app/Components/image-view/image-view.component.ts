import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import Imagegallery from 'src/app/Models/imagegallery';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  userid: string;
  images: Imagegallery[] = [];
  imagepath = "../../../assets/images/";
  success: boolean;
  msgExtra: string;
  constructor(private apiservice: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['user_id'];
    });
    this.apiservice.getUserDataById(this.userid).subscribe(dataObj => {
      //console.log(dataObj.data[0].first_name);
      if(dataObj.success){
        // console.log(dataObj.data[1]);

        this.images = dataObj.data[1];
        // console.log(this.images[1]._id);
      }
    });
  }

  delete_photo(pic_id: string){
    if(window.confirm("Are you sure you want to delete this photo ?")){
      this.apiservice.deletePhotoById(pic_id).subscribe(dataObj=> {
        this.success = dataObj.success;
        this.msgExtra = dataObj.msg;
      });
    }

  }

}
