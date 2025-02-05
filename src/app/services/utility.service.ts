import { Injectable } from '@angular/core';
import { COLOR } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

   public getColorHex(color: COLOR): string {
      console.log(color);
      const colorMap: { [key in COLOR]: string } = {
        [COLOR.RED]: 'red', // Bootstrap danger color
        [COLOR.BLUE]: 'blue', // Bootstrap primary color
        [COLOR.GREEN]: 'green', // Bootstrap success color
        [COLOR.BLACK]: 'black', // Bootstrap dark color
        [COLOR.WHITE]: 'white', // Bootstrap secondary (grayish for contrast)
        [COLOR.PINK]: 'pink',
      };
      console.log(colorMap[color]);
      return colorMap[color] || '#6c757d'; // Default gray if not found
    }
}
