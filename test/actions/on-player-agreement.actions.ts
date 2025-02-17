import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const onPlayerAgreement = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for player agreement!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload
  };

  console.log("OnPlayerAgreement payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/OnPlayerAgreement?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("OnPlayerAgreement Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(
      `Failed to process OnPlayerAgreement: ${response.body?.errorMessage || "Unknown error"}`
    );
  }
};
