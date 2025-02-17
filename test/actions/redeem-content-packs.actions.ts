import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';



export const redeemContentPacks = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for redeeming content packs!");
  }


  const basePayload = createBasePayload(context.playFabId, context.titleId);


  const payload = {
    ...basePayload
  };

  console.log("Redeeming content pack with payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/RedeemContentPacks?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("RedeemContentPacks Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to redeem content pack: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
