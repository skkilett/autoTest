import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { AutomationPipeline } from '../core/pipeline';
import { registerUser, loginUser } from '../actions/auth.actions';
import { createCharacter } from '../actions/character.actions';
import { getXsollaSubscriptionToken } from '../actions/xsolla.actions';  
import { performXsollaPayment } from '../actions/xsolla.puppeteer';
import { redeemContentPacks } from '../actions/redeem-content-packs.actions';
import { onPlayerAgreement } from '../actions/on-player-agreement.actions';
import { setBlockchainCoins } from '../actions/set-blockchain-coins.actions';
import { extendXsollaSubscription } from '../actions/extend-xsolla-subscription.actions';
import { performStripeSubscription } from '../actions/stripe.puppeteer';
import { extendStripeSubscription } from '../actions/extend-stripe-subscription.actions';
import { unsubscribeXsolla } from '../actions/unsubscribe-xsolla.actions';
import { unsubscribeStripe } from '../actions/unsubscribe-stripe.actions';
import { setCurrentCharacter } from '../actions/set-сurrent-сharacter.actions';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let pipeline: AutomationPipeline;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    pipeline = new AutomationPipeline();
  });

  it(
    'Run',
    async () => {
      await pipeline
        .addStep(registerUser, 10000)
        .addStep(loginUser, 10000)
        .addStep(createCharacter, 15000)
        .addStep(onPlayerAgreement, 10000) 
        .addStep(getXsollaSubscriptionToken, 10000) 
        .addStep(performXsollaPayment, 30000) 
        .addStep(performXsollaPayment, 30000)     
        .addStep(setBlockchainCoins("2000"), 10000)
        // .addStep(performStripeSubscription, 30000) 
        .addStep(redeemContentPacks, 15000)
        // .addStep(setBlockchainCoins("2000"), 10000)
        // .addStep(extendStripeSubscription, 10000)
        // .addStep(unsubscribeStripe, 10000)
        // .addStep(performStripeSubscription, 30000)                     
        .run();

      const context = pipeline.getContext();
      console.log('Pipeline completed successfully with context:', context);
    },
    60000 
  );

  afterAll(async () => {
    await app.close();
  });
});
