import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.kalakriti.artisan',
  appName: 'KalaKriti Artisan',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
  },
};

export default config;
