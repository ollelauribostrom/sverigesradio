import clear from 'clear';
import ora from 'ora';
import { listen } from '../src/listen';
import { run } from '../src/bin';

jest.mock('clear', () => jest.fn());
jest.mock('ora', () => jest.fn(() => ({ start: jest.fn() })));
jest.mock('../src/listen', () => ({ listen: jest.fn() }));

describe('Tests for bin.js', () => {
  it('should parse the arguments and select a channel', () => {
    listen.mockReset();
    run(['', '', 'p1']);
    expect(listen).toHaveBeenCalledWith('https://sverigesradio.se/topsy/direkt/srapi/132.mp3');
  });
  it('should call listen with the active channel url', () => {
    listen.mockReset();
    run(['', '']);
    expect(listen).toHaveBeenCalledWith('https://sverigesradio.se/topsy/direkt/srapi/164.mp3');
  });
  it('should clear the screen', () => {
    clear.mockReset();
    run(['', '']);
    expect(clear).toHaveBeenCalled();
  });
  it('should start an ora spinner and display the active channel name', () => {
    const start = jest.fn();
    ora.mockReset();
    ora.mockImplementation(() => ({ start }));
    run(['', '']);
    expect(ora).toHaveBeenCalledWith('Sveriges Radio P3');
    expect(start).toHaveBeenCalled();
  });
});
