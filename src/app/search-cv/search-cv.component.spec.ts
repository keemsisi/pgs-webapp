import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCvComponent } from './search-cv.component';

describe('SearchCvComponent', () => {
  let component: SearchCvComponent;
  let fixture: ComponentFixture<SearchCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
