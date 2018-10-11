import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsReportComponent } from './savings-report.component';

describe('SavingsReportComponent', () => {
  let component: SavingsReportComponent;
  let fixture: ComponentFixture<SavingsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
