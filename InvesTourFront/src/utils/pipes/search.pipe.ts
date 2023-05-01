import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBySymbolPipe'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => item.symbol.toLowerCase().includes(searchText));
  }
}