import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentpipe',
})
export class percentcolorpipe implements PipeTransform{
  transform(value: any) {
    return this.percentpipe(value);
  }

  // get pictures
  percentpipe(val)
  {  
        if (val > 0) {
        return '../../../assets/assets_workdesk/green_arrow.svg';
        }
        else if(val < 0) {
          return '../../../assets/assets_workdesk/red_arrow.svg';
        }
        else if(val == 0) {
          return '../../../assets/assets_workdesk/red_arrow.svg';
        }
  }
}