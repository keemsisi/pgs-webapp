import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsHeaderComponent } from './pgs-header.component';

describe('PgsHeaderComponent', () => {
  let component: PgsHeaderComponent;
  let fixture: ComponentFixture<PgsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
