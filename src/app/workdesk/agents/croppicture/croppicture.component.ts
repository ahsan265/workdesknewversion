import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';

@Component({
  selector: 'app-croppicture',
  templateUrl: './croppicture.component.html',
  styleUrls: ['./croppicture.component.css']
})
export class CroppictureComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagesfile:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private gigaaapi:GigaaaApiService,private message:MessageService,
  public dialogRef: MatDialogRef<CroppictureComponent>,
  ) { }

  ngOnInit(): void {
    this.imageCropped(this.data.picture);

  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}

imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
     this.imagesfile=base64ToFile(event.base64);
    console.log(typeof(this.imagesfile))
    console.log(event, base64ToFile(event.base64));
}

imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
}

loadImageFailed() {
    console.log('Load failed');
}

rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
}

rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
}

private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
}


flipHorizontal() {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
}

flipVertical() {
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
}

resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
}

zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
}

updateRotation() {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
}

uploadprofilepicture()
{
    if(this.data?.loggedinemail==this.data?.useremail)
    {
        this.updateuserprofilepic(this.imagesfile)
    }
    else{
        this.agentupdateuserprofilepic(this.imagesfile,this.data?.uuid);
    }
}
public  updateuserprofilepic(file:any)
  {
      console.log(file)
      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var subsid=getdata.subscription_id.subsid.uuid;
      var id=JSON.parse(localStorage.getItem('intgid'));

     this.gigaaapi.uploaduserprofilepic(accesstoken,subsid,id.int_id,file).subscribe(event=>{
       
       if(event['type']===4)
       {
        var timestamp = (new Date()).getTime();


        this.message.setSuccessMessage("Profile picture updated");
        this.dialogRef.close();
       }
        
       
       
     },err=>{
        console.log(err)

       this.message.setErrorMessage(err.error.error)
     })
    
 
}
public  agentupdateuserprofilepic(file:any,uuid:any)
{
    console.log(uuid)
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    var subsid=getdata.subscription_id.subsid.uuid;
    var id=JSON.parse(localStorage.getItem('intgid'));

   this.gigaaapi.agentuploaduserprofilepic(accesstoken,subsid,id.int_id,uuid,file).subscribe(event=>{
     
     if(event['type']===4)
     {      var timestamp = (new Date()).getTime();


      this.message.setSuccessMessage("Agent profile picture updated");
      this.dialogRef.close()

     }
      
     
     
   },err=>{
       console.log(err)
     this.message.setErrorMessage(err.error.error)
   })
  

}
}
