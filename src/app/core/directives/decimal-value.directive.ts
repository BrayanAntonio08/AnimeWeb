import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimalValue]',
  standalone: true
})
export class DecimalValueDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d*$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputElement: HTMLInputElement = this.el.nativeElement;

    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      if (event.key === 'Backspace' && inputElement.value.length === 1) {
        inputElement.value = '0'; // Replace with '0' if only one character
        event.preventDefault();
      }
      return;
    }

    // Allow only one decimal point
    if (event.key === '.' && inputElement.value.includes('.')) {
      event.preventDefault();
      return;
    }

    // If the current value is '0' and a number or dot is pressed, replace '0' with the new input
    if (inputElement.value === '0' && (/\d/.test(event.key))) {
      inputElement.value = event.key;
      event.preventDefault();
      return;
    }

    // Prevent non-numeric keys except the dot
    if (!/\d/.test(event.key) && event.key !== '.') {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedInput = clipboardData? clipboardData.getData('text'):'';

    // Allow only numbers and a single decimal point in pasted data
    if (!this.regex.test(pastedInput)) {
      event.preventDefault();
    } else {
      // Check if input already contains a dot
      const inputElement: HTMLInputElement = this.el.nativeElement;
      if (pastedInput.includes('.') && inputElement.value.includes('.')) {
        event.preventDefault();
      }
    }
  }
}
