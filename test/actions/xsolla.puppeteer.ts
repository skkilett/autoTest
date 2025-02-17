import puppeteer from 'puppeteer';
import { UserContext } from '../core/user.context';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const performXsollaPayment = async (context: UserContext) => {
  if (!context.xsollaToken) {
    throw new Error('Missing Xsolla token for payment!');
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const paymentUrl = `https://sandbox-secure.xsolla.com/paystation2/?access_token=${context.xsollaToken}`;
    await page.goto(paymentUrl, { waitUntil: 'domcontentloaded' });

    let paymentFormVisible = true;
    try {
      await page.waitForSelector('input[name="card_number"]', { visible: true, timeout: 5000 });
    } catch (error) {
      paymentFormVisible = false;
    }

    if (paymentFormVisible) {
      console.log("Payment form is visible, filling in inputs");
      await page.type('input[name="card_number"]', '4111 1111 1111 1111');
      await page.type('input[name="card_month"]', '12/40');
      await page.type('input[name="cvv"]', '123');
      await page.type('input[name="email"]', 'qq@gmail.com');
      await page.waitForSelector('input#x-checkbox-control-input-allowRecurrentSubscription', { visible: true, timeout: 15000 });
      await page.click('input#x-checkbox-control-input-allowRecurrentSubscription');
      await delay(2000);
      await page.waitForSelector('x-pay-button.pay-button', { visible: true, timeout: 15000 });
      await page.click('x-pay-button.pay-button');
    } else {
      await page.click('x-pay-button');
      console.log("Payment form inputs not found, skipping input steps");
    }

    let zipFieldVisible = true;
    try {
      await page.waitForSelector('input[name="zip"]', { visible: true, timeout: 5000 });
    } catch (error) {
      zipFieldVisible = false;
    }

    if (zipFieldVisible) {
      console.log("Zip field is visible, filling it in");
      await page.type('input[name="zip"]', '43434');
      await delay(2000);
      await page.waitForSelector('x-pay-button', { visible: true, timeout: 15000 });
      await page.click('x-pay-button');
    } else {
      console.log("Zip field not found, skipping zip step");
    }

    try {
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 });
    } catch (navError) {
      console.warn("Navigation did not occur within timeout, proceeding to check for success message.");
    }

    await delay(2500);
    await page.waitForSelector('h2.title-text.ng-star-inserted', { visible: true, timeout: 15000 });
    const successHeader = await page.$('h2.title-text.ng-star-inserted');
    if (successHeader) {
      const headerText = await page.evaluate(el => el.textContent, successHeader);
      if (headerText?.trim() === 'Subscription activated') {
        console.log('Payment completed successfully!');
      } else {
        throw new Error('Payment failed or success message not found.');
      }
    } else {
      throw new Error('Payment success element not found.');
    }
  } catch (error) {
    console.error('Error during payment process:', error);
    throw error;
  } finally {
    await browser.close();
  }
};
