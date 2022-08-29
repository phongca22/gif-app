import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [StorageService]
    }).compileComponents();
  });

  it('should call Storage.init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = TestBed.inject(StorageService);
    spyOn(service, 'init').and.callThrough();
    fixture.detectChanges();
    expect(app).toBeTruthy();
    expect(service.init).toHaveBeenCalled();
  });
});
