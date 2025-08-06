import { Directive, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hideInEditPath]',
  standalone: true,
})
export class HideInEditPath {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    this.activatedRoute.firstChild?.url.subscribe((urlPaths) => {
      const lastPath = urlPaths.pop();
      console.log(lastPath);

      if (lastPath && lastPath.path && lastPath.path === 'edit') {
        this.elementRef.nativeElement.style.display = 'none';
      } else {
        this.elementRef.nativeElement.style.display = 'block';
      }
    });
  }
}
