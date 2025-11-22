import { Injectable } from "@angular/core";
import { Browser } from "@capacitor/browser";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class BrowserService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Opens a URL in the system browser (In-App on mobile).
   * @param url The URL to open.
   */
  async openUrl(url: string): Promise<void> {
    try {
      await Browser.open({
        url,
        toolbarColor: "#ffffff", // optional
        presentationStyle: "popover", // optional (iOS only)
      });
    } catch (error) {
      console.error("Failed to open browser:", error);
    }
  }

  /**
   * Closes the in-app browser if it's still open.
   */
  async close(): Promise<void> {
    try {
      await Browser.close();
    } catch (error) {
      console.error("Failed to close browser:", error);
    }
  }
}
