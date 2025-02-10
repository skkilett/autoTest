export const createBasePayload = (masterPlayerAccountId: string, titlePlayerAccountId: string = '') => {
    return {
      callerEntityProfile: {
        lineage: {
          masterPlayerAccountId,
          titlePlayerAccountId,
        },
      },
      titleAuthenticationContext: {
        id: 'string',
        entityToken: 'string',
      },
      generatePlayStreamEvent: true,
      functionArgument: {
featureSwitches:{SkipAuth0: true, SkipPlayerSessionCheck: true,SkipTokenValidation: true},
      }
    };
  };
  