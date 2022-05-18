import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEyeComponent } from './no-eye.component';

describe('NoEyeComponent', () => {
  let component: NoEyeComponent;
  let fixture: ComponentFixture<NoEyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoEyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
