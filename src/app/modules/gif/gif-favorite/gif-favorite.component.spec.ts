import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifFavoriteComponent } from './gif-favorite.component';

describe('GifFavoriteComponent', () => {
  let component: GifFavoriteComponent;
  let fixture: ComponentFixture<GifFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
