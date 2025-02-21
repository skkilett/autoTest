import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const unsubscribeXsolla = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for unsubscribing from Xsolla!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload
  };

  console.log("UnsubscribeXsolla payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/UnsubscribeXsolla?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("UnsubscribeXsolla Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to unsubscribe from Xsolla subscription: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
