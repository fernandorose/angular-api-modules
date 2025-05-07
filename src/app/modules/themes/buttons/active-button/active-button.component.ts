import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-active-button',
  imports: [],
  templateUrl: './active-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveButtonComponent {
  @Input() button!: {
    buttonName: string;
  };
}
