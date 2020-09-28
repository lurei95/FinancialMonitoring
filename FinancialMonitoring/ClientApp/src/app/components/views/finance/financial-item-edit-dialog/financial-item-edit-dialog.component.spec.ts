import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialItemEditDialogComponent } from './financial-item-edit-dialog.component';

describe('FinancialItemEditDialogComponent', () => {
  let component: FinancialItemEditDialogComponent;
  let fixture: ComponentFixture<FinancialItemEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialItemEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialItemEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
