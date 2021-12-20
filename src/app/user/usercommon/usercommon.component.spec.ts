import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommonComponent } from './usercommon.component';

describe('UsercommonComponent', () => {
  let component: UsercommonComponent;
  let fixture: ComponentFixture<UsercommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
