import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmpComponent } from './register-emp.component';

describe('RegisterEmpComponent', () => {
  let component: RegisterEmpComponent;
  let fixture: ComponentFixture<RegisterEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
