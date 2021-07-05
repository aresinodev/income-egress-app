import { Pipe, PipeTransform } from '@angular/core';
import { IncomeEgress } from '../models/income-egress.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: IncomeEgress[]): IncomeEgress[] {
    return items.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
