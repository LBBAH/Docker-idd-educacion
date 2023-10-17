import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectForgetPasswordComponent } from './select-forget-password.component';

describe('SelectForgetPasswordComponent', () => {
  let component: SelectForgetPasswordComponent;
  let fixture: ComponentFixture<SelectForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectForgetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
