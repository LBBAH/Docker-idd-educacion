import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyMessageComponent } from './sticky-message.component';

describe('StickyMessageComponent', () => {
  let component: StickyMessageComponent;
  let fixture: ComponentFixture<StickyMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
