const channels = {
  P1: {
    name: 'P1',
    url: 'https://sverigesradio.se/topsy/direkt/srapi/132.mp3',
  },
  P2: {
    name: 'P2',
    url: 'https://sverigesradio.se/topsy/direkt/srapi/163.mp3',
  },
  P3: {
    name: 'P3',
    url: 'https://sverigesradio.se/topsy/direkt/srapi/164.mp3',
  },
};

export default {
  ...channels,
  active: channels.P3,
  select(channelName) {
    this.active = this[channelName.toUpperCase()] || channels.P3;
  },
};
