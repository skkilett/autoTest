import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { TEST_CONFIG } from '../config/test.config';
import { createBasePayload } from '../helpers/payload.helper';

export const createCharacter = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for character creation!");
  }

  const characterPayload = {
    ...createBasePayload(context.playFabId, context.titleId),
    functionArgument: {
      characterName: `Character_${Date.now()}`,
      factionKey: "Mriya",
      customizationPreset: {
        id: "33CEE8D14329BB66E86D19B4F34906A1",
        name: "Default",
        body: {
          gender: "Male",
        },
      },
    },
  };

  console.log("Creating character with payload:", characterPayload);

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/Client/CreateCharacter?code=${TEST_CONFIG.API_KEY}`,
    characterPayload
  );

  console.log("CreateCharacter Response:", response.body);

  if (!response.body || response.body.error) {
    throw new Error(`Failed to create character: ${response.body?.errorMessage || "Unknown error"}`);
  }

  console.log("Character created successfully!");
};
