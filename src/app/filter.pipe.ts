import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((user: any) => {
      return Object.values(user).some((value: any) =>
        String(value).toLowerCase().includes(searchText)
      );
    });
  }

  

}
