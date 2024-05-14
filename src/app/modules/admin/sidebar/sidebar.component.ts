import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  toggleExpand() {
    this.sidebar.nativeElement.classList.toggle('expand');
  }
}
