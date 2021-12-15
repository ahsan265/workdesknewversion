import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CroppictureComponent } from './croppicture.component';

describe('CroppictureComponent', () => {
  let component: CroppictureComponent;
  let fixture: ComponentFixture<CroppictureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CroppictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroppictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
