import puppeteer from 'puppeteer';
import { UserContext } from '../core/user.context';
import { writeFile } from 'fs/promises';

export const performXsollaPayment = async (context: UserContext) => {
  if (!context.xsollaToken) {
    throw new Error('Missing Xsolla token for payment!');
  }

  console.log(`Starting payment process for token: ${context.xsollaToken}`);

  const browser = await puppeteer.launch({ headless: false }); // Для отладки лучше отключить headless-режим
  const page = await browser.newPage();

  try {
    // Переходим по ссылке Xsolla Pay Station с токеном
    const paymentUrl = `https://sandbox-secure.xsolla.com/paystation2/?access_token=${context.xsollaToken}`;
    await page.goto(paymentUrl, { waitUntil: 'networkidle2' });

    // Ожидаем появления формы оплаты и вводим данные тестовой карты
    await page.waitForSelector('input[name="card_number"]', { timeout: 6000000 });
    await page.type('input[name="card_number"]', '4111 1111 1111 1111'); // Номер тестовой карты
    await page.type('input[name="card_month"]', '12/40'); // Дата истечения
    await page.type('input[name="cvv"]', '123'); // CVV
    await page.type('input[name="email"]', 'ivan.stupnytsky@ganzillagames.com'); // CVV
    const frames = page.frames();
for (const frame of frames) {
  console.log('Frame URL:', frame.url());
}

await page.evaluate(() => {
    const button = document.querySelector('.is-subscription-purchase x-pay-button > button');
    if (button) {
        button.click();
    } else {
        console.error('Кнопка не найдена внутри evaluate.');
    }
});
    
    


    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Проверяем успешность оплаты
    const successElement = await page.$('.payment-success');
    if (successElement) {
      const successMessage = await page.evaluate(el => el.textContent, successElement);
      if (successMessage?.includes('Payment successful')) {
        console.log('Payment completed successfully!');
      } else {
        throw new Error('Payment failed or success message not found.');
      }
    } else {
      throw new Error('Payment success element not found.');
    }
    
  } catch (error) {
    console.error('Error during payment process:', error);
  } finally {
    await browser.close();
  }
};
