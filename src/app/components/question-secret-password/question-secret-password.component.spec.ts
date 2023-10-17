import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSecretPasswordComponent } from './question-secret-password.component';

describe('QuestionSecretPasswordComponent', () => {
  let component: QuestionSecretPasswordComponent;
  let fixture: ComponentFixture<QuestionSecretPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSecretPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSecretPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
