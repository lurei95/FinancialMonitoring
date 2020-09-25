import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wait-spinner',
  templateUrl: './wait-spinner.component.html',
  styleUrls: ['./wait-spinner.component.css']
})
export class WaitSpinnerComponent
{
  @Input() show: boolean;

  constructor() { }
}