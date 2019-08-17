import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdministratorComponent } from './contact-administrator.component';

describe('ContactAdministratorComponent', () => {
  let component: ContactAdministratorComponent;
  let fixture: ComponentFixture<ContactAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
