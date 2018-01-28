const channels = {
  P1: {
    name: 'P1',
    url: 'http://sverigesradio.se/topsy/direkt/srapi/132.mp3',
  },
  P2: {
    name: 'P2',
    url: 'http://sverigesradio.se/topsy/direkt/srapi/163.mp3',
  },
  P3: {
    name: 'P3',
    url: 'http://sverigesradio.se/topsy/direkt/srapi/164.mp3',
  },
};

export default {
  ...channels,
  active: undefined,
  select(channelName) {
    this.active = this[channelName.toUpperCase()] || this.P3;
  },
};
