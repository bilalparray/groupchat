import { Injectable } from "@angular/core";
import { Network } from "@capacitor/network";

import { CapacitorWifiConnect } from "@falconeta/capacitor-wifi-connect"; // For Wi-Fi status

@Injectable({
  providedIn: "root",
})
export class ConnectivityService {
  constructor() {}

  // 📶 Network
  async getNetworkStatus(): Promise<void> {
    const status = await Network.getStatus();
    console.log("Network status:", status);
  }

  watchNetworkStatus(callback: (status: any) => void): void {
    Network.addListener("networkStatusChange", callback);
  }

  //wifi
  async secureConnect() {
    let { value } = await CapacitorWifiConnect.checkPermission();
    if (value === "prompt") {
      const data = await CapacitorWifiConnect.requestPermission();
      value = data.value;
    }
    if (value === "granted") {
      CapacitorWifiConnect.secureConnect({
        ssid: "SSID",
        password: "PWD",
      }).then((data) => console.log(data));
    } else {
      throw new Error("permission denied");
    }
  }

  async connectToWifi(ssid: string, saveNetwork?: boolean): Promise<void> {
    try {
      await CapacitorWifiConnect.connect({ ssid, saveNetwork });
      console.log("Connected to Wi-Fi");
    } catch (error) {
      console.error("Wi-Fi connection failed:", error);
    }
  }
}
