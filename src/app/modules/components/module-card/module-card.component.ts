import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActiveButtonComponent } from '../../themes/buttons/active-button/active-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-module-card',
  imports: [ActiveButtonComponent, RouterLink],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModuleCardComponent {
  @Input() apiModule!: {
    id: string;
    title: string;
    description: string;
    event: string;
    route: string;
  };

  moduleButton = {
    buttonName: 'Go',
  };
}
