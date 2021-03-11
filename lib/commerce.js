import CommerceSDK from "@chec/commerce.js";

const checAPIKey = process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY;
const devEnvironment = process.env.NODE_ENV === 'development';

// Commerce.js constructor options
const commerceConfig = {
  axiosConfig: {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-03-10',
    },
  },
};

if (devEnvironment && !checAPIKey) {
  throw Error('Your public API key must be provided as an environment variable named `NEXT_PUBLIC_CHEC_PUBLIC_API_KEY`. Obtain your Chec public key by logging into your Chec account and navigate to Setup > Developer, or can be obtained with the Chec CLI via with the command chec whoami');
}

export const commerce = new CommerceSDK(
  checAPIKey,
  devEnvironment,
  commerceConfig,
);
