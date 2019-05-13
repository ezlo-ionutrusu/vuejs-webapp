import WS from '@/API/websocket';

const getHubs = async () => {
  const response = await WS.send('getEzlos', {});
  return response.data.ezlos;
};

const addNewHub = () => Promise.reject(new Error('Not implemented'));

const hubsAPI = {
  getHubs,
  addNewHub,
};

export default hubsAPI;
