import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMobilePopupFilterComponent } from './call-mobile-popup-filter.component';

describe('CallMobilePopupFilterComponent', () => {
  let component: CallMobilePopupFilterComponent;
  let fixture: ComponentFixture<CallMobilePopupFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallMobilePopupFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallMobilePopupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
