import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessErrorComponent } from './access-error.component';

describe('AccessErrorComponent', () => {
  let fixture: ComponentFixture<AccessErrorComponent>;
  let component: AccessErrorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Access Error" heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent?.trim()).toBe('Access Error');
  });
});
