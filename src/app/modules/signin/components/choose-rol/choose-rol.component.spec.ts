import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRolComponent } from './choose-rol.component';

describe('ChooseRolComponent', () => {
  let component: ChooseRolComponent;
  let fixture: ComponentFixture<ChooseRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
