import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access-error',
  templateUrl: './access-error.component.html',
  styleUrl: './access-error.styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessErrorComponent {}
