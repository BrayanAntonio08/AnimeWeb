import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIntegerValue]',
  standalone: true
})
export class IntegerValueDirective {

  private regex: RegExp = new RegExp(/^\d+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputElement: HTMLInputElement = this.el.nativeElement;

    // Handle special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      if (event.key === 'Backspace' && inputElement.value.length === 1) {
        inputElement.value = '0'; // Replace with '0' if only one character
        event.preventDefault();
      }
      return;
    }

    // If the current value is '0' and a number is pressed, replace '0' with the number
    if (inputElement.value === '0' && this.regex.test(event.key)) {
      inputElement.value = event.key;
      event.preventDefault();
      return;
    }

    // Do not allow non-numeric keys
    if (!this.regex.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedInput = clipboardData?.getData('text');

    // Allow only numbers in pasted data
    if (!this.regex.test(pastedInput?pastedInput:'')) {
      event.preventDefault();
    }
  }

}
