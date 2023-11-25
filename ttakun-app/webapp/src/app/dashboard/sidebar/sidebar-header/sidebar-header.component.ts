import { Component, OnInit } from '@angular/core';
import { CollapseService } from 'src/app/core/services/visual/collapse.service';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.css']
})
export class SidebarHeaderComponent implements OnInit {

  constructor(
    private collapseService: CollapseService,
  ) { }

  ngOnInit(): void {
  }

  onToggleCollapse() {
    this.collapseService.toggleCollapse();
  }

}
