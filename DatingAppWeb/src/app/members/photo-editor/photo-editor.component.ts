import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Photo} from "../../_models/photo";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../_services/auth.service";
import {UserService} from "../../_services/user.service";
import {AlertifyService} from "../../_services/alertify.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor (private authService: AuthService, private userService : UserService,
               private aleritify : AlertifyService){

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      autoUpload : false,
      removeAfterUpload : true,
      maxFileSize : 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }

    this.uploader.onSuccessItem = (item, response, status, headers)=> {
        if(response){
          const res : Photo = JSON.parse(response);
          const photo = {
            id : res.id,
            url : res.url,
            dataAdded: res.dateAdded,
            description : res.description,
            idMain : res.isMain
          };
          this.photos.push(photo);
        }
    };
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe( res => this.response = res );

  }

  ngOnInit(): void {
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(() =>{
         this.currentMain = this.photos.filter(p => p.isMain == true)[0];
         this.currentMain.isMain = false;
         photo.isMain = true;
         this.getMemberPhotoChange.emit(photo.url);
         this.authService.changeMemberPhoto(photo.url);
         this.authService.currentUser.photoUrl = photo.url;
         localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      },error => {
          this.aleritify.error(error);
      });
  }

  deletePhoto(id: Number){
    this.aleritify.confirm('Are you sure you want to delete this photo', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id == id), 1);
        this.aleritify.success("Photo has been deleted deleted");
      },error =>{
        this.aleritify.error(error);
        console.log(error);
      });
    });
  }
}
