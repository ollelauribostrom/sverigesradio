export function formatName(str) {
  return str.split(' ').join('-').toUpperCase();
}

export function parseChannels(channels) {
  return channels.reduce((channelObj, next) => {
    channelObj[formatName(next.name)] = next;
    return channelObj;
  }, {});
}
