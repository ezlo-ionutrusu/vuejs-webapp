import WS from '@/API/websocket';

const convertItems = items => (items
  ? items.map((itemSrc) => {
    const item = { ...itemSrc };
    if (item.name === 'rgbcolor') {
      item.show = true;
    }
    if (item.name === 'siren_strobe') {
      item.isSetting = true;
    }

    return item;
  })
  : []);

const itemsAPI = {
  getItems: async () => {
    const response = await WS.send('getItems', {});
    return convertItems(response.data.items);
  },
  setItemValue: (_id, value) => WS.send('setItemValue', {
    _id,
    value,
  }),
};

export default itemsAPI;
