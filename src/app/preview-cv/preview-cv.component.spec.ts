import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCvComponent } from './preview-cv.component';

describe('PreviewCvComponent', () => {
  let component: PreviewCvComponent;
  let fixture: ComponentFixture<PreviewCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
