import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ElementsService } from './../../services/elements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.sass']
})
export class SiteLayoutComponent implements OnInit {

  @ViewChild('navigate') navigate: ElementRef

  sub: Subscription
  toggled: Boolean = false
  links: any[]
 
  constructor( private elements: ElementsService) { }

  ngOnInit() {
    this.getMenuLinks()
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  toggle() {
    if (this.toggled) {
      this.toggled = false
      return
    }
    this.toggled = true
  }

  closeToggle($event) {
    if($event.target.tagName != 'NAV' && $event.target.tagName != 'DIV' && 
      this.navigate.nativeElement.classList.contains('expanded')) {
      this.toggled = false
    }
  }

  getMenuLinks() {
    this.sub = this.elements.getMenuLimks().subscribe(
      (links) => {
        this.links = links 
      },
      error => {
        console.log(error.error.message);
      }
    )
  }

  

}
