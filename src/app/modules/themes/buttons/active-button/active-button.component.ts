import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-button',
  imports: [],
  templateUrl: './active-button.component.html',
  styleUrl: './active-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveButtonComponent {
  @Input() button!: {
    buttonName: string;
    event: string;
  };
}
