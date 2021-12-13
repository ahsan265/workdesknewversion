import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { SafeUrl } from '@angular/platform-browser';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { FileHandle } from './dragdroppic';

@Component({
  selector: 'app-croppicture',
  templateUrl: './croppicture.component.html',
  styleUrls: ['./croppicture.component.css']
})

export class CroppictureComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  filename:any;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  autoTicks = false;
  showTicks = false;
  step = 5;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;
  zoomoutnumber=0;
  zoominnumber=100;
  zoomvalue:any=0;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imagesfile:any;
  uploadpicture:any;
  loadpicture:any;
  croppicture:any;
  progressbarvalue:any=0;
  filesize:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private gigaaapi:GigaaaApiService,private message:MessageService,
  public dialogRef: MatDialogRef<CroppictureComponent>,
  private shared_res:sharedres_service,
  ) { }

  ngOnInit(): void {
    this.uploadpicture=true;
    this.loadpicture=false;
    this.croppicture=false; 
  //  this.imageCropped(this.data.picture);

  }
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  bytesToSize(bytes) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while(n >= 1024 && ++l){
      n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
  saveFiles(files: FileList) {

    if (files.length > 1) {
        this.message.setErrorMessage("Only one file is allowed")
    }
   
  }
  // get picture tranisition 
  uploadpictuetransition(val)
  {
        if(val==true)
        {
            this.uploadpicture=true;
            this.loadpicture=false;
            this.croppicture=false; 
        }
        else if(val==false){
            this.uploadpicture=false;
            this.loadpicture=false;
            this.croppicture=false; 
        }
  }
  filesDropped(event: any): void {
        console.log(event[0])
        this.filename=event[0].file.name;

        this.bytesToSize
        //this.fileChangeEvent(event)
        this.uploadpicture=false;
        this.croppicture=false
        this.imageChangedEvent = event[0].url;
        this.loadpicture=true;
 
        setInterval(() => {
            if(this.progressbarvalue!=100)
            {
             this.progressbarvalue +=1;
            }
            if(this.progressbarvalue==100)
        {
      
             if(this.loadpicture==true)
             {
                 this.uploadpicture=false;
                 this.loadpicture=false;
                 this.croppicture=true;
             }
        }
        },50)
  }

  fileChangeEvent(event: any): void {
      console.log(event)
       this.filename=event.target.files[0].name;
        this.filesize=this.bytesToSize(event.target.files[0].size);
       this.uploadpicture=false;
       this.croppicture=false
       this.imageChangedEvent = event;
       this.loadpicture=true;

       setInterval(() => {
           if(this.progressbarvalue!=100)
           {
            this.progressbarvalue +=1;
           }
           if(this.progressbarvalue==100)
       {
     
            if(this.loadpicture==true)
            {
                this.uploadpicture=false;
                this.loadpicture=false;
                this.croppicture=true;
            }
       }
       },50)

       
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
getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
        console.log(this.autoTicks ? 'auto' : this.tickInterval)
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

updateSetting(event: MatSliderChange) {
       this.zoomvalue=event.value;
       if(this.zoomvalue!=100)
       {
        this.scale= (this.zoomvalue/10)*0.1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
       }
            
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
    if(this.zoomvalue!=0)
    {       
        this.zoomvalue-=10;
        this.scale -=.1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }
    else{
        this.resetImage()
    }
}

zoomIn() {
    if(this.zoomvalue!=100)
    {
        this.zoomvalue +=10;
        this.scale +=.1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }
    console.log(this.zoomoutnumber)
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
       console.log(event)
       if(event['type']===4)
       {        
        this.shared_res.sendpictureupdated(event['body']['96'])
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
     console.log(event)
     if(event['type']===4)
     {   
        
        this.shared_res.sendpictureupdated(event['body']['96'])

      this.message.setSuccessMessage("Agent profile picture updated");
      this.dialogRef.close()

     }
      
     
     
   },err=>{
       console.log(err)
     this.message.setErrorMessage(err.error.error)
   })
  

}
}
