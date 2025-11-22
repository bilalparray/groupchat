import { Injectable } from "@angular/core";
import { DatetimePicker } from "@capawesome-team/capacitor-datetime-picker";
import { BaseService } from "./base.service";
import { AppService } from "./app.service";
import flatpickr from "flatpickr";

@Injectable({
  providedIn: "root",
})
export class DatetimeService extends BaseService {
  constructor(private appService: AppService) {
    super();
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Opens a date/time picker for the user to select a date and/or time.
   *
   * @param options - Configuration options for the picker.
   * @param options.mode - The mode of the picker, can be "datetime". Defaults to "date".
   * @param options.value - The default value to be shown in the picker, in ISO string format.
   * @param options.min - The minimum selectable date/time, in ISO string format.
   * @param options.max - The maximum selectable date/time, in ISO string format.
   * @returns A promise that resolves to the selected date/time in ISO string format, or null if the picker is cancelled or errors occur.
   */

  async openPicker(
    options: {
      mode?: "date" | "time" | "datetime";
      value?: string;
      min?: string;
      max?: string;
    } = {}
  ): Promise<string | null> {
    if ((await this.appService.getPlatform()) == "web") {
      return this.openWebPicker(options);
    }

    try {
      const result = await DatetimePicker.present({
        mode: options.mode || "date",
        value: options.value || new Date().toISOString(),
        min: options.min,
        max: options.max,
        theme: "light",
      });

      return result.value;
    } catch (err) {
      console.error("DateTime Picker cancelled or errored", err);
      return null;
    }
  }

  private openWebPicker(options: {
    mode?: "date" | "time" | "datetime";
    value?: string;
    min?: string;
    max?: string;
  }): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");

      const mode = options.mode || "date";
      const enableTime = mode === "datetime" || mode === "time";
      const noCalendar = mode === "time";

      const config: flatpickr.Options.Options = {
        enableTime,
        noCalendar,
        time_24hr: true,
        dateFormat:
          mode === "datetime"
            ? "Y-m-d\\TH:i" // good for ISO-like format
            : mode === "time"
            ? "H:i"
            : "Y-m-d",
        defaultDate: options.value || new Date().toISOString(),
        minDate: options.min,
        maxDate: options.max,
        onClose: (selectedDates) => {
          if (selectedDates.length > 0) {
            resolve(selectedDates[0].toISOString());
          } else {
            resolve(null);
          }
          document.body.removeChild(input);
        },
      };

      input.type = "text"; // very important: flatpickr only works properly on type="text"
      input.style.position = "fixed";
      input.style.top = "-100px";
      input.style.opacity = "0";
      document.body.appendChild(input);

      const fp = flatpickr(input, config);

      // Use setTimeout to give the DOM a moment before triggering the picker
      setTimeout(() => input.click(), 0);
    });
  }

  private formatForInput(iso: string, type: string): string {
    const date = new Date(iso);
    if (type === "datetime-local") {
      return date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
    } else if (type === "date") {
      return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    } else if (type === "time") {
      return date.toISOString().slice(11, 16); // "HH:MM"
    }
    return "";
  }
}
