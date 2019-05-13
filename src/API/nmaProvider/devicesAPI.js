/* eslint-disable camelcase */
import WS from '@/API/websocket';

const convertLogItem = (logItem) => {
  const {
    _id, data_type, dev_name, room, label, valueLabel, age,
  } = logItem;
  return {
    id: _id,
    age,
    deviceType: data_type,
    deviceName: dev_name,
    room,
    label,
    value: valueLabel,
  };
};

const getLogs = async ({
  from,
  to,
  startRecords,
  limitRecords,
  roomsFilter,
  typeFilter,
  deviceId,
}) => {
  const startTime = from ? from.getTime() : 0;
  const length = to.getTime() - startTime;
  const response = await WS.send('getWhatHappened', {
    startTime,
    startRecords,
    length,
    limitRecords,
    deviceFilter: [deviceId],
    roomsFilter,
    typeFilter,
  });

  const { data } = response;

  return { logs: data.logs.map(convertLogItem), total: data.total };
};

const ezloAPI = {
  getDevices: async () => {
    const response = await WS.send('getDevices', {});
    return response.data.devices;
  },
  setFavoriteDevice: async (deviceId, isFavorite) => {
    const result = await WS.send('foSetFavorite', {
      devices: [
        {
          _id: deviceId,
          favorite: isFavorite,
        },
      ],
      items: [],
      rules: [],
    });

    return result;
  },
  getLogs,
};

export default ezloAPI;
