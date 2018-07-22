import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPasswordComponent } from './profile-edit-password.component';

describe('ProfileEditPasswordComponent', () => {
  let component: ProfileEditPasswordComponent;
  let fixture: ComponentFixture<ProfileEditPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
