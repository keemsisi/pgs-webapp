import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunbmitCvComponent } from './sunbmit-cv.component';

describe('SunbmitCvComponent', () => {
  let component: SunbmitCvComponent;
  let fixture: ComponentFixture<SunbmitCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunbmitCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunbmitCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
