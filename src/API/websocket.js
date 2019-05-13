import WS from 'websocket-rpc-client';
import WSpacketOverwrite from 'websocket-rpc-client/dest/ws/packet';
import PoolOverwrite from 'websocket-rpc-client/dest/ws/pool';
import WSOverwrite from 'websocket-rpc-client/dest/ws/ws';
import EventsOverwrite from 'websocket-rpc-client/dest/ws/events';
import defer from 'lodash/defer';
import pako from 'pako';

function createWSpacket(method, params, resolve, reject) {
  this.message.jsonrpc = '2.0';
  this.message.method = method;
  this.message.id = this.id;
  this.message.params = params;
  this.rejectCb = reject;
  this.resolveCb = resolve;
}

function resolveReq(response) {
  if (Object.prototype.hasOwnProperty.call(response, 'msg_subclass')) {
    EventsOverwrite.resolveEvent(response);
  } else {
    PoolOverwrite.resolvePacket(response);
  }
}

function sendReq(method, params) {
  return new Promise((resolve, reject) => {
    const packet = PoolOverwrite.createPacket();

    packet.create(method, params, resolve, reject);

    if (!this.isOnline()) {
      packet.reject('Failed connection');

      return;
    }
    const dataObj = packet.getMessage();
    let data = JSON.stringify(dataObj);

    packet.sourceOut = data;
    if (this.isBinary) {
      data = pako.deflate(data, { gzip: true }).buffer;
    }
    this.ws.send(data);
  });
}

function parseMessage(msg) {
  try {
    return JSON.parse(msg);
  } catch (error) {
    const id = msg.match(/id":\\ ?"\w*-\w*-\w*-\w*-\w*/gi)[0].match(/\w*-\w*-\w*-\w*-\w*/g)[0];

    return { error, id, result: {} };
  }
}

function onMessage(data) {
  try {
    let msg = data.data;

    if (data.data instanceof ArrayBuffer) {
      this.ws.isBinary = true;
      msg = pako.inflate(new Uint8Array(data.data), { to: 'string' });
    }

    this.resolve(parseMessage(msg));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error on got message', e);
  }
}

function resolveEvent(resp) {
  const cbs = this.pool.get(resp.msg_subclass);

  if (cbs) {
    cbs.forEach(cb => defer(cb, resp.result));
  }
}

function unsubscribe(name, cb) {
  if (name) {
    const cbs = this.pool.get(name);

    if (cb) {
      const index = cbs.indexOf(cb);

      if (index >= 0) {
        cbs.splice(index, 1);
      }
    } else {
      this.pool.delete(name);
    }
  }

  return this;
}

function getIndex() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

function abort() {
  PoolOverwrite.clear();
}

WSOverwrite.resolve = resolveReq;
WSOverwrite.send = sendReq;
WSOverwrite.onMessage = onMessage;
WSOverwrite.abort = abort;

EventsOverwrite.resolveEvent = resolveEvent;
EventsOverwrite.unsubscribe = unsubscribe;

WSpacketOverwrite.prototype.create = createWSpacket;
PoolOverwrite.getIndex = getIndex;

export default WS;
