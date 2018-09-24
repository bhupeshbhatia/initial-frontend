import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDashComponent } from './inv-dash.component';

describe('InvDashComponent', () => {
  let component: InvDashComponent;
  let fixture: ComponentFixture<InvDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
