import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = 'Error 404: Nothing exists here';
  @Input()
  resetLinkText = 'Reset';
  @Input()
  resetLinkRoute = '/';
  constructor() {}
}
