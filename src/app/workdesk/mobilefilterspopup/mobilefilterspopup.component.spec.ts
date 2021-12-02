import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobilefilterspopupComponent } from './mobilefilterspopup.component';

describe('MobilefilterspopupComponent', () => {
  let component: MobilefilterspopupComponent;
  let fixture: ComponentFixture<MobilefilterspopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilefilterspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilefilterspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
