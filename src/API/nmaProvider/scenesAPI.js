import WS from '@/API/websocket';

const editScene = scene => WS.send('foEditRule', { _id: scene._id, eo: scene });

const deleteScene = id => WS.send('deleteRule', { _id: id });

const createScene = async (scene) => {
  const response = await WS.send('foCreateRule', scene);

  const {
    data: { _id },
  } = response;
  return _id;
};

const scenesAPI = {
  getListRules: async () => {
    const response = await WS.send('foListRules', {});

    return response.data;
  },
  editScene,
  deleteScene,
  createScene,
};

export default scenesAPI;
