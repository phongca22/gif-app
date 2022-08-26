import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/']);
  }

  goFavorite() {
    this.router.navigate(['favorite']);
  }

  goUpload() {
    this.router.navigate(['upload']);
  }

  goCollections() {
    this.router.navigate(['collection']);
  }
}
