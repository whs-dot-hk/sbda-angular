import { Component } from '@angular/core';

import { faListUl, faPlus, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jobs Database';

  faListUl = faListUl;
  faPlus = faPlus;
  faExternalLinkAlt = faExternalLinkAlt;
}
