import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassCodeVerificationComponent } from './forgot-pass-code-verification.component';

describe('ForgotPassCodeVerificationComponent', () => {
  let component: ForgotPassCodeVerificationComponent;
  let fixture: ComponentFixture<ForgotPassCodeVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPassCodeVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassCodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
