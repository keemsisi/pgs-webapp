import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PGSHomeComponent } from './pgs-home.component';

describe('PGSHomeComponent', () => {
  let component: PGSHomeComponent;
  let fixture: ComponentFixture<PGSHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PGSHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PGSHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
