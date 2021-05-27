import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SigninComponent } from './Components/signin/signin.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { CardComponent } from './Core/card/card.component';
import { UploadImageComponent } from './Components/upload-image/upload-image.component';
import { IndexheaderComponent } from './Components/indexheader/indexheader.component';
import { ProfileSettingComponent } from './Components/profile-setting/profile-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,

    ImageViewComponent,
    CardComponent,
    UploadImageComponent,
    IndexheaderComponent,
    ProfileSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
