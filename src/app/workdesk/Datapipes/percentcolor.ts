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
        return {'color':'#64DFDF'};
        }
        else if(val < 0) {
          return {'color':'#FF155A'};
        }
        else if(val == 0) {
          return {'color':'#A6A8BA'};
        }
  }
}