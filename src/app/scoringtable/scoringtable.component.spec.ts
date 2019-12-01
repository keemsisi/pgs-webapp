import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringtableComponent } from './scoringtable.component';

describe('ScoringtableComponent', () => {
  let component: ScoringtableComponent;
  let fixture: ComponentFixture<ScoringtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
