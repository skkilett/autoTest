import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';

export const getXsollaSubscriptionToken = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for Xsolla subscription!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const subscriptionPayload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument,
      subscriptionPlanId: TEST_CONFIG.XSOLLA_SUB_ID,
    },
  };

  console.log("Requesting Xsolla Subscription Token with payload:", JSON.stringify(subscriptionPayload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/GetXsollaSubscriptionToken?code=${TEST_CONFIG.API_KEY}`,
    subscriptionPayload
  );

  console.log("GetXsollaSubscriptionToken Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to get Xsolla subscription token: ${response.body?.errorMessage || "Unknown error"}`);
  }

  context.update({ xsollaToken: response.body.PurchaseToken });
  console.log(`Xsolla subscription token: ${context.xsollaToken}`);
};
