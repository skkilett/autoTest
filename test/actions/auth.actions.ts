import { TEST_CONFIG } from '../config/test.config';
import { apiClient } from '../helpers/request.helper';
import { UserContext } from '../core/user.context';
import { createBasePayload } from '../helpers/payload.helper';


export const registerUser = async (context: UserContext) => {
  const timestamp: number = Date.now();
  const uniqueUsername: string = `${timestamp}`;
  const uniqueEmail: string = `${timestamp}@gmail.com`;

  console.log(`Registering user: ${uniqueEmail}`);

  const response = await apiClient.post(
    `${TEST_CONFIG.REG_URL}/Client/RegisterPlayFabUser`,
    {
      Username: uniqueUsername,
      Email: uniqueEmail,
      Password: "123123123",
      TitleId: TEST_CONFIG.TITLE_ID,
    }
  );

  if (!response.body?.data?.PlayFabId || !response.body?.data?.SessionTicket || !response.body?.data?.EntityToken?.Entity?.Id) {
    throw new Error("Registration failed: Missing PlayFabId, SessionTicket, or TitleId!");
  }

  context.update({
    playFabId: response.body.data.PlayFabId,
    sessionTicket: response.body.data.SessionTicket,
    titleId: response.body.data.EntityToken.Entity.Id, 
    username: uniqueUsername,
    password: "123123123",
  });
};


export const loginUser = async (context: UserContext) => {
  if (!context.playFabId || !context.titleId) {
    throw new Error("Missing PlayFabId or titleId for login!");
  }

  const loginPayload = createBasePayload(context.playFabId, context.titleId);

  console.log("Login Payload:", loginPayload);

  const response = await apiClient.post(
    `${TEST_CONFIG.BASE_URL}/client/OnLogin?code=${TEST_CONFIG.API_KEY}`,
    loginPayload
  );

  console.log("OnLogin Response:", response.body);
};
