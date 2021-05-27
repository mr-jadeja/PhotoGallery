import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Photos from './../../Models/photos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  photos = new Photos(null,'');
  uploadformmy: FormGroup;
  userid: string;
  success: boolean;
  msgExtra: string;
  typeArray: Array<string> = ['image/jpeg', 'image/jpg', 'image/png'];
  constructor(private apiservice: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['user_id'];
    });
    this.uploadformmy = new FormGroup({
      'image': new FormControl(null,[Validators.required]),
      'caption': new FormControl(null,[Validators.required])
    });
  }

  selectImage(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photos.image = file;
    }
  }



  upload_photo(){
    if(this.typeArray.includes(this.photos.image.type)){
      this.apiservice.postPhotoById(this.userid,this.photos.caption,this.photos.image).subscribe(dataObj => {
        this.msgExtra = dataObj.msg;
        this.success = dataObj.success;
        if(this.success){
          this.uploadformmy.reset();
        }
      });
    }
    else{
      this.msgExtra = "Only .jpeg .jpg .png file allowed !!";
      this.success = false;
      this.uploadformmy.reset();
    }

  }



}
