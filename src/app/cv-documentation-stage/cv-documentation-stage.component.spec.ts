import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDocumentationStageComponent } from './cv-documentation-stage.component';

describe('CvDocumentationStageComponent', () => {
  let component: CvDocumentationStageComponent;
  let fixture: ComponentFixture<CvDocumentationStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDocumentationStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDocumentationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
