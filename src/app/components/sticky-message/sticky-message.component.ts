import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-sticky-message',
  templateUrl: './sticky-message.component.html',
  styleUrls: ['./sticky-message.component.css']
})
export class StickyMessageComponent {
  windowScrolled?: boolean;
  constructor(@Inject(DOCUMENT) private document: Document,
  private matDialog: MatDialog){ }
  
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  banner(){
    this.matDialog.open(BannerComponent,
      {
        width:"800px",
        height: "auto"

      });
  }
}
