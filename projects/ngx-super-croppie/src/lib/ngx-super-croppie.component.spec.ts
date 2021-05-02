import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuperCroppieComponent } from './ngx-super-croppie.component';

describe('NgxSuperCroppieComponent', () => {
  let component: NgxSuperCroppieComponent;
  let fixture: ComponentFixture<NgxSuperCroppieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSuperCroppieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSuperCroppieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
