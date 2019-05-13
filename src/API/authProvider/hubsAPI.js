import ServerError from '@/API/ServerError';
import envConfig from '@/API/authProvider/envConfig';
import { callAuthorized } from './authAPI';

function convertHubsList(hubsResponse) {
  if (!hubsResponse) {
    return [];
  }
  const hubs = hubsResponse.map((hub) => {
    const serial = hub.PK_Device;
    const serialHash = hub.PK_Oem_Device;
    const macAddress = hub.MacAddress;
    const connected = true;
    return {
      description: hub.Name || macAddress || serial,
      serial,
      serial_hash: serialHash,
      macAddress: hub.MacAddress,
      type: hub.PK_DeviceType,
      properties: {
        ezloColor: null,
      },
      connected,
    };
  });
  return hubs;
}

const getHubs = async (account) => {
  const { id } = account;
  const path = `account/${id}/getAccountDevices`;
  const response = await callAuthorized(path);
  const { status } = response;
  switch (status) {
    case 200: {
      const { Devices: devices } = await response.json();
      return convertHubsList(devices);
    }
    case 404: {
      // empty hubs list
      return convertHubsList();
    }
    default: {
      throw new ServerError('ezlo.error.message.get.hubs', status);
    }
  }
};

const addNewHub = async () => {
  const query = { route: envConfig.routes.addHub };
  const response = await callAuthorized(
    'redirect',
    {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    {
      method: 'GET',
      redirect: 'follow',
      credentials: 'same-origin',
    },
    null,
    query,
  );
  const { status } = response;
  if (status !== 200) {
    throw new ServerError('ezlo.error.message.redirect.include.hub', status);
  }
  setTimeout(() => {
    window.location.href = response.url;
  }, 400);
};

const hubsAPI = {
  getHubs,
  addNewHub,
};

export default hubsAPI;
