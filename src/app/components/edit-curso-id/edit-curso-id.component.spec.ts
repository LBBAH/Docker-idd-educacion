import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCursoIdComponent } from './edit-curso-id.component';

describe('EditCursoIdComponent', () => {
  let component: EditCursoIdComponent;
  let fixture: ComponentFixture<EditCursoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCursoIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCursoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
