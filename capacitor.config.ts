import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.qayham.groupchat',
  appName: 'groupchat',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: false,
    },
  },
};

export default config;
