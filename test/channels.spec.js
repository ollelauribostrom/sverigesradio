import request from 'request';
import { createChannelProvider, getChannels } from '../src/channels';
import mockResponse from './resources/mockResponse';

jest.mock('request', () => ({
  get: jest.fn((url, cb) => cb(null, { statusCode: 200 }, mockResponse)),
}));

describe('Tests for channels.js', () => {
  describe('createChannelProvider', () => {
    it('should create a channel provider', async () => {
      const channelProvider = await createChannelProvider();
      expect(channelProvider.active.name).toEqual('P3');
    });
    it('should update the active channel on select', async () => {
      const channelProvider = await createChannelProvider();
      channelProvider.select('p1');
      expect(channelProvider.active.name).toEqual('P1');
    });
    it('should default the active channel to P3 when passing non existing channel name', async () => {
      const channelProvider = await createChannelProvider();
      channelProvider.select('p1');
      channelProvider.select('Non existing channel');
      expect(channelProvider.active.name).toEqual('P3');
    });
    it('should default the active channel to P3 when not passing any channel argument', async () => {
      const channelProvider = await createChannelProvider();
      channelProvider.select('p1');
      channelProvider.select();
      expect(channelProvider.active.name).toEqual('P3');
    });
  });
  describe('getChannels', () => {
    it('should return a channelObject', async () => {
      const channels = await getChannels();
      expect(channels).toMatchSnapshot();
    });
    it('should handle request errors', async () => {
      request.get.mockImplementation((url, cb) => cb(new Error()));
      await expect(getChannels()).rejects.toThrowError();
    });
    it('should handle non 200 responses', async () => {
      request.get.mockImplementation((url, cb) => cb(null, { statusCode: 500 }));
      await expect(getChannels()).rejects.toThrowError();
    });
  });
});
