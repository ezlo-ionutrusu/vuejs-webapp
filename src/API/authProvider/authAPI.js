import { storage } from '@/API';
import ServerError from '@/API/ServerError';
import envConfig from '@/API/authProvider/envConfig';

const { baseURL, apiURL } = envConfig;

function callApi(endpoint, headers, options, payload, query) {
  const queryEncoded = query
    ? `?${Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')}`
    : '';

  return fetch(`${baseURL}/${apiURL ? `${apiURL}/` : ''}${endpoint}${queryEncoded}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: payload ? JSON.stringify(payload) : null,
    ...options,
  });
}

async function callAuthorized(endpoint, headers, options, payload, query) {
  const token = storage.getToken();
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const response = await callApi(endpoint, { ...headers, ...authHeaders }, options, payload, query);

  if (response.status === 401) {
    const responseRefresh = await callApi('auth/token/refresh', authHeaders, { method: 'PATCH' });

    const { status } = responseRefresh;
    if (status !== 200) {
      throw new ServerError('ezlo.error.message.notAuthorized', 401);
    }
    return callApi(endpoint, { ...headers, ...authHeaders }, options, payload, query);
  }
  return response;
}

export { callApi, callAuthorized };
