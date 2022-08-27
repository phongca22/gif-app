import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifInfoComponent } from './gif-info.component';

describe('GifInfoComponent', () => {
  let component: GifInfoComponent;
  let fixture: ComponentFixture<GifInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
