import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const extendStripeSubscription = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for extending subscription!");
  }


  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument,
      price: 999,
    },
  };

  console.log("ExtendStripeSubscription payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/StripeProlongSubscription?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("ExtendStripeSubscription Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to extend Stripe subscription: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
