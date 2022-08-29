import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive/shared-directive.module';
import { DestroyService } from 'src/app/services/destroyer.service';
import { GiphyService } from 'src/app/services/giphy.service';
import { GifModule } from '../gif/gif.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { asyncData } from '../upload/upload.component.spec';
import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingComponent } from './trending.component';

let service: GiphyService;

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingComponent],
      imports: [
        CommonModule,
        MatGridListModule,
        GifModule,
        SearchBarModule,
        TrendingRoutingModule,
        FlexLayoutModule,
        SharedDirectiveModule,
        MatProgressBarModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [DestroyService]
    }).compileComponents();

    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GiphyService);
    spyOn(service, 'getDataByTrending').and.callFake(() =>
      asyncData({
        data: [
          {
            images: {
              preview_webp: { url: '' },
              original: { url: '' }
            }
          }
        ],
        pagination: { total_count: 1 }
      })
    );
  });

  it('should get data', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(service.getDataByTrending).toHaveBeenCalled();
    expect(component.total).toEqual(1);
  }));

  it('should load more', fakeAsync(() => {
    fixture.detectChanges();
    component.loadMore();
    expect(component.offset).toEqual(10);
    expect(component.showLoader).toBeTrue();
    tick();
    expect(service.getDataByTrending).toHaveBeenCalled();
  }));
});
