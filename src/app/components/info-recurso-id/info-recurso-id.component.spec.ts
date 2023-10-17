import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecursoIdComponent } from './info-recurso-id.component';

describe('InfoRecursoIdComponent', () => {
  let component: InfoRecursoIdComponent;
  let fixture: ComponentFixture<InfoRecursoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRecursoIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRecursoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
