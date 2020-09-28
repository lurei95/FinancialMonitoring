import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboEditComponent } from './combo-edit.component';

describe('ComboEditComponent', () => {
  let component: ComboEditComponent;
  let fixture: ComponentFixture<ComboEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
