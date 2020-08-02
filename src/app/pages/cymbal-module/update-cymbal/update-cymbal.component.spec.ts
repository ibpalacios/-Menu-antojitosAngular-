import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCymbalComponent } from './update-cymbal.component';

describe('UpdateCymbalComponent', () => {
  let component: UpdateCymbalComponent;
  let fixture: ComponentFixture<UpdateCymbalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCymbalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCymbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
