import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkexpiredialogComponent } from './linkexpiredialog.component';

describe('LinkexpiredialogComponent', () => {
  let component: LinkexpiredialogComponent;
  let fixture: ComponentFixture<LinkexpiredialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkexpiredialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkexpiredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
