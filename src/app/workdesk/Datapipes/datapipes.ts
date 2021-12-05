import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getpicture',
})
export class getloadpictures implements PipeTransform{
  transform(value: any) {
    return this.getpicture(value);
  }

  // get pictures
  getpicture(val)
  {  
      var timestamp = new Date().getTime();
      var img=val+ '?_=' + timestamp;
     // this.changeDetector.markForCheck()
      return img;
  }
}