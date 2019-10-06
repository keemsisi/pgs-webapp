import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPaswwordComponent } from './forgot-paswword.component';

describe('ForgotPaswwordComponent', () => {
  let component: ForgotPaswwordComponent;
  let fixture: ComponentFixture<ForgotPaswwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPaswwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPaswwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
