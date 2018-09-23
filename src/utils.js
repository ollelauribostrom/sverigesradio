export function formatName(str) {
  return str.split(' ').join('-').toUpperCase();
}

export function parseChannels(channels) {
  return channels.reduce((channelObj, next) => {
    channelObj[formatName(next.name)] = next;
    return channelObj;
  }, {});
}

export function parseDate(timestring) {
  const s = /([0-9])\d+/.exec(timestring)[0];
  const n = Number(s);
  return new Date(n);
}
