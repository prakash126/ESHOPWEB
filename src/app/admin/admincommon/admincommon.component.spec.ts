import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincommonComponent } from './admincommon.component';

describe('AdmincommonComponent', () => {
  let component: AdmincommonComponent;
  let fixture: ComponentFixture<AdmincommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
