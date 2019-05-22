import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.sass']
})
export class SiteLayoutComponent implements OnInit {

  toggled: Boolean = false

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    console.log('toggle');
    if (this.toggled) {
      this.toggled = false
      return
    }
    this.toggled = true

  }

}
