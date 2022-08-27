import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concatMap, filter } from 'rxjs';
import { GiphyService } from 'src/app/services/giphy.service';
import { Gif } from './gif';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifComponent implements OnInit, OnChanges {
  @Input() data: Gif;
  @Input() hideFavorite: boolean;
  @Input() canRemove: boolean;
  @Output() remove: EventEmitter<void>;
  showPanel: boolean;
  isFavorite: boolean;
  imageUrl: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private service: GiphyService
  ) {}

  ngOnChanges(): void {
    if (this.data) {
      this.loadImage();
    } else {
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {
    this.remove = new EventEmitter();
  }

  loadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageUrl = this.data?.image.original;
      this.cdr.markForCheck();
    };

    img.src = this.data!.image.original;
  }

  view() {
    this.router.navigate(['gif-info', this.data.id]);
  }

  showConfirm() {
    this.dialog
      .open(RemoveDialogComponent)
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        concatMap(() => this.service.remove(this.data.id))
      )
      .subscribe(() => this.remove.emit());
  }
}
