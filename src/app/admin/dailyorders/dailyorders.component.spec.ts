import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyordersComponent } from './dailyorders.component';

describe('DailyordersComponent', () => {
  let component: DailyordersComponent;
  let fixture: ComponentFixture<DailyordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
