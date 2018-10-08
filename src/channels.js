import request from 'request';
import { channelEndpoint } from './config';
import { parseChannels } from './utils';

export function createRequestError(response) {
  const error = new Error();
  error.statusCode = response && response.statusCode;
  return error;
}

export function getChannels() {
  return new Promise((resolve, reject) => {
    request.get(channelEndpoint, (err, response, body) => {
      if (err) {
        reject(createRequestError(response));
      }
      if (response && response.statusCode !== 200) {
        reject(createRequestError(response));
      }
      const { channels } = JSON.parse(body);
      resolve(parseChannels(channels));
    });
  });
}

export async function createChannelProvider() {
  const channels = await getChannels();
  return {
    active: channels.P3,
    select(channelName = '') {
      this.active = channels[channelName.toUpperCase()] || channels.P3;
    },
  };
}
