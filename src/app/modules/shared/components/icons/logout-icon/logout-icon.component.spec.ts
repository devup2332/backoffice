import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutIconComponent } from './logout-icon.component';

describe('LogoutIconComponent', () => {
  let component: LogoutIconComponent;
  let fixture: ComponentFixture<LogoutIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
