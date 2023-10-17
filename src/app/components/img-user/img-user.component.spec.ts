import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgUserComponent } from './img-user.component';

describe('ImgUserComponent', () => {
  let component: ImgUserComponent;
  let fixture: ComponentFixture<ImgUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
