import * as dotenv from 'dotenv';

dotenv.config();

export const TEST_CONFIG = {
  TITLE_ID: process.env.DEV_01_TITLE_ID || '',
  API_KEY: process.env.API_KEY || '',
  REG_URL: `https://${process.env.DEV_01_TITLE_ID}.playfabapi.com`,
  BASE_URL: `https://func-g01-dev01-wu-api.azurewebsites.net/api`,
  XSOLLA_SUB_ID: process.env.XSOLLA_SUB_ID,
  CHEAT_KEY: process.env.CHEAT_KEY || '',
  BASE_CHEAT_URL: 'https://func-g01-dev01-wu-api-cheat.azurewebsites.net/api'
};
