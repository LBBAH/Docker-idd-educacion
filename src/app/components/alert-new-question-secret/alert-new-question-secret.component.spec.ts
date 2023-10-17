import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNewQuestionSecretComponent } from './alert-new-question-secret.component';

describe('AlertNewQuestionSecretComponent', () => {
  let component: AlertNewQuestionSecretComponent;
  let fixture: ComponentFixture<AlertNewQuestionSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertNewQuestionSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNewQuestionSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
