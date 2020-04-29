import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BewitchComponent } from './bewitch.component';

describe('BewitchComponent', () => {
  let component: BewitchComponent;
  let fixture: ComponentFixture<BewitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BewitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BewitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
