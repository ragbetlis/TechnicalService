import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandComponentComponent } from './add-brand-component.component';

describe('AddBrandComponentComponent', () => {
  let component: AddBrandComponentComponent;
  let fixture: ComponentFixture<AddBrandComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrandComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrandComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
