import { TEST_CONFIG } from '../config/test.config';
import { apiClient } from './request.helper';

export const registerUser = async (): Promise<{ playFabId: string; entityToken: string; titleId: string }> => {
  const timestamp = Date.now();
  const uniqueUsername = `sk${timestamp}`;
  const uniqueEmail = `sk${timestamp}@gmail.com`;

  console.log(`Registering user: ${uniqueEmail}`);

  const response = await apiClient.post(
    `${TEST_CONFIG.REG_URL}/Client/RegisterPlayFabUser`,
    {
      Username: uniqueUsername,
      Email: uniqueEmail,
      Password: "123123123",
      TitleId: TEST_CONFIG.TITLE_ID,
    },
    {
      'Accept-Encoding': 'identity',
    }
  );

  console.log("Register Response:", response.body);

  if (!response.body?.data?.PlayFabId || !response.body?.data?.EntityToken || !TEST_CONFIG.TITLE_ID) {
    throw new Error("Registration failed: No PlayFabId, EntityToken, or TitleId returned!");
  }

  return {
    playFabId: response.body.data.PlayFabId,
    entityToken: response.body.data.EntityToken,
    titleId: TEST_CONFIG.TITLE_ID,
  };
};

export const loginUser = async (playFabId: string, entityToken: string, titleId: string) => {
  if (!playFabId || !entityToken || !titleId) {
    throw new Error("Missing PlayFabId, EntityToken, or TitleId from registration response!");
  }

  if (!TEST_CONFIG.API_KEY) {
    throw new Error("Missing API_KEY in environment variables!");
  }

  const loginPayload = {
    callerEntityProfile: {
      lineage: {
        masterPlayerAccountId: playFabId,
        titlePlayerAccountId: titleId,
      },
    },
    titleAuthenticationContext: {
      id: 'string',
      entityToken: 'string',
    },
    generatePlayStreamEvent: true,
    functionArgument: {
      "featureSwitches": {
        "SkipAuth0": true,
        "SkipTokenValidation": true,
        "SkipPlayerSessionCheck": true,
      },
    },
  };

  console.log("Login Payload:", loginPayload);

  const response = await apiClient.post(
    `${TEST_CONFIG.LOGIN_URL}?code=${TEST_CONFIG.API_KEY}`,
    loginPayload
  );

  console.log("OnLogin Response:", response.body);
};
