import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,

  use: {
    baseURL: 'http://localhost:3000',
    /* Görünür mod — headed: true aşağıdaki CLI flag ile açılıyor */
    headless: false,
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'tr-TR',
    timezoneId: 'Europe/Istanbul',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Dev sunucusu zaten ayakta varsayıyoruz — otomatik başlatma kapalı */
  // webServer: { command: 'npm run dev', port: 3000 },
});
