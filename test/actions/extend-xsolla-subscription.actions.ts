import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const extendXsollaSubscription = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for extending subscription!");
  }


  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument,
      priceString: '999'
    }
  };

  console.log("ExtendXsollaSubscription payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/ExtendXSollaSubscription?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("ExtendXsollaSubscription Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to extend xsolla subscription: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
