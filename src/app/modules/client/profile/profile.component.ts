import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { storageUtils } from 'src/app/shared/helpers/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  formVip !: FormGroup
  fileImage !: File
  urlPreview : any

  constructor(private builder : FormBuilder, private userSv : UserService){}
  currentUser : any
  ngOnInit() {
    this.formVip = this.builder.group({
      
    })
    this.currentUser = storageUtils.get('currentUser');
  } 

  changeImage(event : any) {
    const file: File = event.target.files[0];
    this.fileImage = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.urlPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  save() {

  }
}
