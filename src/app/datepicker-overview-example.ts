import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

/** @title Basic datepicker */
@Component({
  selector: "datepicker-overview-example",
  templateUrl: "datepicker-overview-example.html",
  styleUrls: ["datepicker-overview-example.css"]
})
export class DatepickerOverviewExample {
  title = 'Date Picker Sandbox';
  label = 'Hire date';
  placeholder = 'Choose a date';
  error = false;
  errormsg = '';

  shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @ViewChild('datepicker', { static: true }) datepicker!: ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2) {}

  // buttonClick() {
  //   const datepickerInput = this.datepicker.nativeElement;
  //   console.log("button clicked",datepickerInput);
  //   this.renderer.setAttribute(datepickerInput, 'open', 'true');
  // }

  buttonClick() {
    // const datepicker: HTMLInputElement | null = document.querySelector('input[type="date"]');
    // console.log("button clicked",datepicker);
    // datepicker?.showPicker()
    this.datepicker.nativeElement.showPicker();
  }

  changeHandler(date: string) {
    const date_selected = new Date(date + 'T00:00:00');
    const date_label: HTMLInputElement | null = document.querySelector('input[type="text"]');
    this.formatAll(date_selected, new Date(date_label!.value + 'T00:00:00'));
  }

  formatAll(new_date_obj: Date, old_date_obj: Date) {
    this.clearError();
    const date_label: HTMLInputElement| null = document.querySelector('input[type="text"]');
    const date_input: HTMLInputElement| null = document.querySelector('input[type="date"]');
    const initial_value = this.formatDate(old_date_obj);
    const new_value = this.formatDate(new_date_obj);
    // Prevent event loop
    if (old_date_obj.getTime() !== new_date_obj.getTime()) {
      date_label!.value = new_value;
      date_input!.valueAsDate = new_date_obj;
    }
  }

  valiDate(displayed_value: string) {
    const date_input: HTMLInputElement|null= document.querySelector('input[type="date"]');
    const displayed_value_tokens = displayed_value.split('-');
    if (this.shortMonths.includes(displayed_value_tokens[0])) {
      if (+displayed_value_tokens[1] >= 1 && +displayed_value_tokens[1] <= 31) {
        if (/^(\d{4})$/.test(displayed_value_tokens[2])) {
          try {
            this.formatAll(new Date(displayed_value), new Date(date_input.value + 'T00:00:00'));
          } catch (error) {
            // Proper formatting, but invalid date
            console.log(error);
            this.displayError();
          }
        }
      }
    }
    try {
      const displayed_value_as_date = new Date(displayed_value);
      if (
        displayed_value_as_date.getFullYear() >= 1000 &&
        displayed_value_as_date.getFullYear() <= 10000
      ) {
        this.formatAll(displayed_value_as_date, new Date(date_input.value + 'T00:00:00'));
      } else {
        // Year is not 4 digits, improper formatting
        this.displayError();
      }
    } catch (error) {
      // Improper formatting, and invalid date
      console.log(error);
      this.displayError();
    }
  }

  formatDate(input: Date): string {
    return (
      this.shortMonths[input.getMonth()] +
      '-' +
      input.getDate().toString().padStart(2, '0') +
      '-' +
      input.getFullYear()
    );
  }

  displayError(msg = 'Please format as MMM-DD-YYYY. For example, Jan-01-' + new Date().getFullYear() + '.') {
    this.errormsg = msg;
    this.error = true;
  }

  clearError() {
    this.error = false;
    this.errormsg = '';
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
