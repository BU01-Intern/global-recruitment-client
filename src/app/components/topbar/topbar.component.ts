import { Component, Input, OnInit } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() isCollapsed!: boolean;
  @Input() collapse!: NgbCollapse;

  constructor() { }

  ngOnInit(): void {
  }

}
