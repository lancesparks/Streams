import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[numbersOnly]",
  standalone: true,
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"])
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    if (inputValue !== numericValue) {
      this.el.nativeElement.value = numericValue;
    }
  }
}
