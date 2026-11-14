import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchComponent } from './search/search.component';

@Component({ selector: 'app-root', standalone: true, imports: [SidenavComponent, ToolbarComponent, SearchComponent], templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {}
