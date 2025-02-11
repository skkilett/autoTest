import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { AutomationPipeline } from '../core/pipeline';
import { registerUser, loginUser } from '../actions/auth.actions';
import { createCharacter } from '../actions/character.actions';
import { getXsollaSubscriptionToken } from '../actions/xsolla.actions';  
import { performXsollaPayment } from '../actions/xsolla.puppeteer';

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

  it('should register, log in, create a character, and get an Xsolla token', async () => {
    await pipeline
      .addStep(registerUser)
      .addStep(loginUser)
      .addStep(createCharacter)
      .addStep(getXsollaSubscriptionToken) 
      .addStep(performXsollaPayment)
      .run();

    const context = pipeline.getContext();
    console.log('Pipeline completed successfully with context:', context);
  }, 15000);

  afterAll(async () => {
    await app.close();
  });
});
