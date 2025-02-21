import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const unsubscribeStripe = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for unsubscribing from Stripe!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload
  };

  console.log("UnsubscribeStripeSubscription payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/StripeCancelSubscription?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("UnsubscribeStripeSubscription Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to unsubscribe from Stripe subscription: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
