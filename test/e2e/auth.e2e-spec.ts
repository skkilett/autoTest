import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { registerUser, loginUser } from '../utils/auth.helpers';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let playFabId: string;
  let entityToken: string;
  let titleId: string; // Переменная объявлена, но не была присвоена

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register a new user', async () => {
    const userData = await registerUser();
    playFabId = userData.playFabId;
    entityToken = userData.entityToken;
    titleId = userData.titleId; 
  });

  it('should log in a user', async () => {
    if (!playFabId || !entityToken || !titleId) {
      throw new Error("Missing required data from registration!");
    }
    await loginUser(playFabId, entityToken, titleId);
  });

  afterAll(async () => {
    await app.close();
  });
});
