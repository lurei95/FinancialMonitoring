import { FinancialItemModel } from './financialItem.model';
import { FinancialCategoryModel } from './financialCatgegory.model';
import { DirectionKind } from './directionKind';

describe('FinacialCategoryModel', () => 
{
  it("Value is callculated correctly", () => 
  {
    let model = new FinancialCategoryModel();
    let child = new FinancialCategoryModel();
    let item1 = new FinancialItemModel();
    let item2 = new FinancialItemModel();
    item1.dueDate = item2.dueDate = new Date(Date.now());
    item1.value = 12;
    item1.direction = DirectionKind.Income;
    item2.value = 10;
    item2.direction = DirectionKind.Expense;
    model.items.push(item1);
    child.items.push(item2);
    model.childCategories.push(child);

    expect(model.value).toBe(2);
  })
});
