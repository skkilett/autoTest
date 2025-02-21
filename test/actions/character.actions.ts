import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';
import { characterFunctionArgument } from '../payloads/character.function-argument';

export const createCharacter = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for character creation!");
  }

  const basePayload = createBasePayload(context.playFabId, context.titleId);

  const payload = {
    ...basePayload,
    functionArgument: {
      ...basePayload.functionArgument, 
      ...characterFunctionArgument,
      characterName: `Character_${Date.now()}`,
    },
  };

  console.log("Creating character with payload:", JSON.stringify(payload, null, 2));

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/CreateCharacter?code=${TEST_CONFIG.API_KEY}`,
    payload
  );

  console.log("CreateCharacter Response:", response.body);
  context.update({
    characterId: response.body.CharacterId,
  });
  if (!response.body || response.body.error) {
    throw new Error(`Failed to create character: ${response.body?.errorMessage || "Unknown error"}`);
  }
};
