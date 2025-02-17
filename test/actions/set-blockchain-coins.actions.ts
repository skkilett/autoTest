import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const setBlockchainCoins = (amount: string) => async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for setting blockchain coins!");
  }


  const basePayload = createBasePayload(context.playFabId, context.titleId);


  const payload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument,
      amountString: amount
    }
  };

  console.log("Setting blockchain coins with payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_CHEAT_URL}/cheat/SetBlockchainCoins?code=${TEST_CONFIG.CHEAT_KEY}`,
    payload
  );

  console.log("SetBlockchainCoins Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to set blockchain coins: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
