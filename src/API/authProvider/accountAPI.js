import ServerError from '@/API/ServerError';
import { callAuthorized } from './authAPI';

const getAccount = async () => {
  const response = await callAuthorized('auth/me');
  const { status } = response;

  if (status !== 200) {
    throw new ServerError('ezlo.error.message.get.account', status);
  }

  const result = await response.json();
  const {
    id,
    username: name,
    email,
    auth_data: { Identity: identity, IdentitySignature: identiySign },
  } = result;
  return {
    id,
    name,
    email,
    identity,
    identiySign,
  };
};

const accountAPI = {
  getAccount,
};

export default accountAPI;
