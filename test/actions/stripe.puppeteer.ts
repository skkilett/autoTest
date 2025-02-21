import puppeteer from 'puppeteer';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const performStripeSubscription = async (context: UserContext): Promise<void> => {
  if (!context.playFabId || !context.titleId) {
    throw new Error('Missing PlayFab ID or Title ID for payment!');
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const timestamp = Date.now();

  try {
    const stripePaymentUrl = `${TEST_CONFIG.STRIPE_URL}${context.playFabId}_${context.titleId}`;
    console.log(`🔗 Navigating to Stripe payment link: ${stripePaymentUrl}`);
    
    await page.goto(stripePaymentUrl, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('input[name="email"]', { timeout: 20000 });
    await page.waitForSelector('input[name="cardNumber"]');
    await page.waitForSelector('input[name="cardExpiry"]');
    await page.waitForSelector('input[name="cardCvc"]');
    await page.waitForSelector('input[name="billingName"]');

    console.log('📌 Filling in payment details...');

    await page.type('input[name="email"]', `${timestamp}@gmail.com`);
    await page.type('input[name="cardNumber"]', '4242 4242 4242 4242');
    await page.type('input[name="cardExpiry"]', '12/40');
    await page.type('input[name="cardCvc"]', '123');
    await page.type('input[name="billingName"]', `User ${context.playFabId}`);
    const postalCodeField = await page.$('input[name="billingPostalCode"]');
    if (postalCodeField) {
      console.log('📌 Billing postal code field detected, filling...');
      await page.type('input[name="billingPostalCode"]', '01001');
    } else {
      console.log('ℹ️ No billing postal code field detected, skipping...');
    }


    console.log('🛒 Looking for payment button...');
    let payButton = await page.$('button[type="submit"]');

    if (payButton) {
      console.log('🛒 Scrolling to the payment button...');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), payButton);
      await delay(1000);
      console.log('✅ Button is now in view, clicking...');
      await payButton.click();
    }

    console.log('⏳ Waiting for payment confirmation...');

    const successElement = await page.waitForSelector('div.PaymentSuccess-content', { timeout: 20000 });
    console.log(successElement);
    

    if (successElement) {
      console.log('✅ Stripe Subscription completed successfully!');
    } else {
      throw new Error('❌ Payment failed or success confirmation not found.');
    }
  } catch (error) {
    console.error('❌ Error during Stripe payment:', error);
    throw error;
  } finally {
    console.log('🔚 Closing browser...');
    await browser.close();
  }
};
