import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Smoke testi — Ankara Onarım Atlası
 * Çalıştır: npx playwright test --headed
 */

test.describe('Ana sayfa', () => {
  test('başlık doğru yükleniyor', async ({ page }) => {
    await page.goto('/');

    /* <title> kontrolü */
    await expect(page).toHaveTitle(/Onarım Atlası/i);

    /* Header logosunun görünmesi */
    const logo = page.getByText('Onarım Atlası').first();
    await expect(logo).toBeVisible();

    /* Hero başlığı */
    const hero = page.getByRole('heading', { level: 1 }).first();
    await expect(hero).toBeVisible();

    /* Ekran görüntüsü */
    const dir = path.resolve('e2e/screenshots');
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, 'homepage.png'), fullPage: false });

    console.log('✅ Ana sayfa başarıyla yüklendi — ekran görüntüsü: e2e/screenshots/homepage.png');
  });
});

test.describe('Atlas sayfaları', () => {
  test('/atlas listesi yükleniyor', async ({ page }) => {
    await page.goto('/atlas');
    /* SectionHeading h2 kullanıyor */
    await expect(page.getByRole('heading').first()).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/atlas.png', fullPage: false });
    console.log('✅ /atlas sayfası tamam');
  });

  test('Kağıt Sanatı haritası yükleniyor', async ({ page }) => {
    await page.goto('/atlas/kagit-sanati');
    await expect(page).toHaveURL(/kagit-sanati/);
    await page.screenshot({ path: 'e2e/screenshots/kagit-sanati.png', fullPage: false });
    console.log('✅ /atlas/kagit-sanati tamam');
  });
});

test.describe('Navigasyon', () => {
  test('header bağlantıları çalışıyor', async ({ page }) => {
    await page.goto('/');

    /* Nav'daki "Atlas" linkini bul (tam eşleşme — "Onarım Atlası" logo hariç) */
    const atlasLink = page.getByRole('navigation').getByRole('link', { name: 'Atlas' }).first();
    await expect(atlasLink).toBeVisible();

    /* Tıkla → /atlas'a git */
    await atlasLink.click();
    await expect(page).toHaveURL(/\/atlas/);
    console.log('✅ Header nav linki çalışıyor');
  });
});
