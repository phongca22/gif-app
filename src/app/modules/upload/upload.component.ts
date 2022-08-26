import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { delay, finalize, from, mergeMap, tap } from 'rxjs';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isUploading: boolean;
  tagCtrl: FormControl = new FormControl();

  constructor(private builder: FormBuilder, private service: UploadService) {}

  get images() {
    return this.form.controls['images'] as FormArray;
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      images: this.builder.array([])
    });
  }

  selectFiles(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          this.images.push(
            this.builder.group({
              src: [reader.result],
              tags: [[]],
              name: [file.name],
              file: [file],
              isUploading: [false],
              isCompleted: [false]
            })
          );
        },
        false
      );

      reader.readAsDataURL(file);
    }

    event.target.value = null;
  }

  add(event: MatChipInputEvent, form: AbstractControl): void {
    const value = (event.value || '').trim();
    const list = form.get('tags')?.value as string[];

    if (value && !list.includes(value)) {
      list.push(value);
    }

    event.chipInput!.clear();
    this.images.controls;
  }

  remove(name: string, form: AbstractControl): void {
    const list = form.get('tags')?.value as string[];
    const index = list.indexOf(name);

    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  removeFile(index: number) {
    this.images.controls.splice(index, 1);
  }

  upload() {
    this.isUploading = true;
    this.tagCtrl.disable();
    from(this.images.controls)
      .pipe(
        tap((ctrl: AbstractControl) => {
          ctrl.patchValue({
            isUploading: true
          });
        }),
        mergeMap((ctrl: AbstractControl) => {
          const form = ctrl.value;
          ctrl.patchValue({
            isUploading: true
          });
          return this.service.upload(form.file, form.tags).pipe(
            tap(() => ctrl.patchValue({ isCompleted: true })),
            delay(2500),
            tap(() => this.removeFile(this.images.controls.indexOf(ctrl)))
          );
        }),
        finalize(() => {
          this.isUploading = false;
        })
      )
      .subscribe();
  }
}
