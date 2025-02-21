import * as dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.ENVIRONMENT?.toUpperCase() || 'DEV01';

const ENV_CONFIGS = {
  DEV01: {
    TITLE_ID: process.env.DEV01_TITLE_ID || '',
    REG_URL: `https://${process.env.DEV_01_TITLE_ID}.playfabapi.com`,
    API_KEY: process.env.API_DEV01_KEY || '',
    BASE_URL: process.env.BASE_DEV01_URL || '',
    XSOLLA_SUB_ID: process.env.XSOLLA_DEV01_SUB_ID || '',
    XSOLLA_URL: process.env.XSOLLA_DEV01_URL || '',
    CHEAT_KEY: process.env.CHEAT_DEV01_KEY || '',
    CHEAT_URL: process.env.CHEAT_DEV01_URL || '',
    STRIPE_URL: process.env.STRIPE_DEV01_URL || '',
  },
  STAB: {
    TITLE_ID: process.env.STAB_TITLE_ID || '',
    REG_URL: `https://${process.env.STAB_TITLE_ID}.playfabapi.com`,
    API_KEY: process.env.API_STAB_KEY || '',
    BASE_URL: process.env.BASE_STAB_URL || '',
    XSOLLA_SUB_ID: process.env.XSOLLA_STAB_SUB_ID || '',
    XSOLLA_URL: process.env.XSOLLA_STAB_URL || '',
    CHEAT_KEY: process.env.CHEAT_STAB_KEY || '',
    CHEAT_URL: process.env.CHEAT_STAB_URL || '',
    STRIPE_URL: process.env.STRIPE_STAB_URL || '',
  },
};

export const TEST_CONFIG = ENV_CONFIGS[ENV];

console.log(`🔧 Loaded config for environment: ${ENV}`);
