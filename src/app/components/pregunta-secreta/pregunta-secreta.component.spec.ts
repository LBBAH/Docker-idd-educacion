import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaSecretaComponent } from './pregunta-secreta.component';

describe('PreguntaSecretaComponent', () => {
  let component: PreguntaSecretaComponent;
  let fixture: ComponentFixture<PreguntaSecretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaSecretaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntaSecretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
