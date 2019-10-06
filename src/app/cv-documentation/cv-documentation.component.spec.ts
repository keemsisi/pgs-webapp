import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDocumentationComponent } from './cv-documentation.component';

describe('CvDocumentationComponent', () => {
  let component: CvDocumentationComponent;
  let fixture: ComponentFixture<CvDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
