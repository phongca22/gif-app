import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { defer } from 'rxjs';
import { GiphyService } from 'src/app/services/giphy.service';
import { UploadRoutingModule } from './upload-routing.module';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [
        CommonModule,
        UploadRoutingModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatChipsModule,
        MatProgressBarModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dyanmic forms', fakeAsync(() => {
    let addEventListener = jasmine.createSpy();
    let readAsDataURL = jasmine.createSpy();
    spyOn(window, 'FileReader').and.returnValue({
      addEventListener: addEventListener,
      readAsDataURL: readAsDataURL
    } as any);

    const files = [new File(['abc'], 'abc.gif')];

    component.selectFiles({
      target: {
        files: files
      }
    });

    expect(addEventListener).toHaveBeenCalledTimes(files.length);
    expect(readAsDataURL).toHaveBeenCalledTimes(files.length);
  }));

  it('should add tag', () => {
    let clear = jasmine.createSpy();
    const form = new FormGroup({
      tags: new FormControl([])
    });
    component.add(
      {
        value: 'a',
        chipInput: {
          clear: clear
        }
      } as any,
      form
    );

    expect(clear).toHaveBeenCalled();
    expect(form.get('tags')!.value as string[]).toEqual(['a']);
  });

  it('should remove tag', () => {
    const form = new FormGroup({
      tags: new FormControl(['a'])
    });
    component.remove('a', form);
    expect(form.get('tags')!.value as string[]).toEqual([]);
  });

  it('should remove file', () => {
    component.images.push(new FormGroup({}));
    component.removeFile(0);
    expect(component.images.length).toEqual(0);
  });

  it('should upload all files', fakeAsync(() => {
    let service = TestBed.inject(GiphyService);
    spyOn(service, 'upload').and.callFake(() => asyncData({}));
    spyOn(component, 'removeFile').and.callThrough();
    component.images.push(new FormGroup({}));
    component.images.push(new FormGroup({}));
    component.upload();
    expect(component.isUploading).toBeTrue();
    tick(2500);
    expect(component.tagCtrl.disabled).toBeTrue();
    expect(service.upload).toHaveBeenCalled();
    expect(component.removeFile).toHaveBeenCalledTimes(2);
    expect(component.isUploading).toBeFalse();
  }));
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
