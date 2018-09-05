import { channels, createChannelProvider } from '../src/channels';

describe('Tests for channels.js', () => {
  describe('createChannelProvider', () => {
    it('should create a channel provider', () => {
      const channelProvider = createChannelProvider();
      expect(channelProvider.active.name).toEqual('P3');
    });
    it('should update the active channel on select', () => {
      const channelProvider = createChannelProvider();
      channelProvider.select('p1');
      expect(channelProvider.active.name).toEqual('P1');
    });
    it('should default the active channel to P3 when passing non existing channel name', () => {
      const channelProvider = createChannelProvider();
      channelProvider.select('p1');
      channelProvider.select('Non existing channel');
      expect(channelProvider.active.name).toEqual('P3');
    });
    it('should default the active channel to P3 when not passing any channel argument', () => {
      const channelProvider = createChannelProvider();
      channelProvider.select('p1');
      channelProvider.select();
      expect(channelProvider.active.name).toEqual('P3');
    });
  });
  describe('channels', () => {
    it('should expose the correct channels', () => {
      expect(channels).toEqual({
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
      });
    });
  });
});
