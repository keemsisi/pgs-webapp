import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonteachingstaffComponent } from './nonteachingstaff.component';

describe('NonteachingstaffComponent', () => {
  let component: NonteachingstaffComponent;
  let fixture: ComponentFixture<NonteachingstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonteachingstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonteachingstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
