import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { AutomationPipeline } from '../core/pipeline';
import { registerUser, loginUser } from '../actions/auth.actions';
import { createCharacter } from '../actions/character.actions';

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

  it('should register, log in, and create a character', async () => {
    await pipeline
      .addStep(registerUser)
      .addStep(loginUser)
      .addStep(createCharacter)
      .run();
  });

  afterAll(async () => {
    await app.close();
  });
});
