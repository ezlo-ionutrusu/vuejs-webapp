import WS from '@/API/websocket';

const convertRoomType = (room) => {
  const { imageId, pageName } = room;
  return { imageId, id: pageName, name: pageName };
};

const getRoomTypes = async () => {
  const response = await WS.send('getRoomTypes');

  const { roomTypes } = response.data;

  return roomTypes.map(convertRoomType);
};

const getRoomsList = async () => {
  const response = await WS.send('listPages', {});
  const roomsList = response.data;

  return roomsList;
};

const addRoom = (name, roomType) => WS.send('createPage', {
  name,
  subtype: roomType,
  type: 'room',
});

const deleteRoom = id => WS.send('deletePage', {
  _id: id,
});

const setRoomName = (id, name) => WS.send('setPageName', {
  _id: id,
  name,
});

const setRoomImage = (id, imageId) => WS.send('setPageImage', {
  _id: id,
  imageId,
});

const editRoom = async (id, { name, imageId }) => {
  const requests = [];
  if (name) requests.push(setRoomName(id, name));
  if (imageId) requests.push(setRoomImage(id, imageId));
  if (requests.length === 0) return;
  await Promise.all(requests);
};

const setRoomOrder = roomsId => WS.send('setPageOrder', {
  pagesId: roomsId,
});

const roomsAPI = {
  getRoomTypes,
  getRoomsList,
  addRoom,
  deleteRoom,
  editRoom,
  setRoomOrder,
};

export default roomsAPI;
