import WS from '@/API/websocket';

const getFavorites = async () => {
  const response = await WS.send('foGetFavorites', {});
  return response.data.favorites;
};

const dashboardAPI = {
  getFavorites,
};

export default dashboardAPI;
