import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsHomeLandingComponent } from './pgs-home-landing.component';

describe('PgsHomeLandingComponent', () => {
  let component: PgsHomeLandingComponent;
  let fixture: ComponentFixture<PgsHomeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgsHomeLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgsHomeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
