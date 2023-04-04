import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCallComponent } from './home-call.component';

describe('HomeCallComponent', () => {
  let component: HomeCallComponent;
  let fixture: ComponentFixture<HomeCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
