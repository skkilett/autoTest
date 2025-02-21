import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';


export const setCurrentCharacter = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing playFabId or titleId for setting current character!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument,
      characterId: context.characterId
    },
  };

  console.log("SetCurrentCharacter payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/SetCurrentCharacter?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("SetCurrentCharacter Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to set current character: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
