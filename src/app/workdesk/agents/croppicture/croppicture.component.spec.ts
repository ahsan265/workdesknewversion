import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppictureComponent } from './croppicture.component';

describe('CroppictureComponent', () => {
  let component: CroppictureComponent;
  let fixture: ComponentFixture<CroppictureComponent>;

  beforeEach(async(() => {
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
