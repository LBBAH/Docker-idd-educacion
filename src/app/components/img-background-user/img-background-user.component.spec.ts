import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBackgroundUserComponent } from './img-background-user.component';

describe('ImgBackgroundUserComponent', () => {
  let component: ImgBackgroundUserComponent;
  let fixture: ComponentFixture<ImgBackgroundUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgBackgroundUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgBackgroundUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
