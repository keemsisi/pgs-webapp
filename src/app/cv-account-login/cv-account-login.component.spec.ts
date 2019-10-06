import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAccountLoginComponent } from './cv-account-login.component';

describe('CvAccountLoginComponent', () => {
  let component: CvAccountLoginComponent;
  let fixture: ComponentFixture<CvAccountLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvAccountLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvAccountLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
