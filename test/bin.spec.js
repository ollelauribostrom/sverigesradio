import clear from 'clear';
import ora from 'ora';
import { createChannelProvider } from '../src/channels';
import { listen } from '../src/listen';
import { run } from '../src/bin';
import { createMetadataProvider } from '../src/metadata';

jest.mock('clear', () => jest.fn());
jest.mock('ora', () => jest.fn(() => ({ start: jest.fn(), fail: jest.fn() })));
jest.mock('../src/listen', () => ({ listen: jest.fn() }));
jest.mock('../src/channels', () => ({
  createChannelProvider: jest.fn(() => ({
    select: jest.fn(),
    active: { liveaudio: { url: 'MOCKEDURL' }, name: 'P3' },
  })),
}));
jest.mock('../src/metadata', () => ({
  createMetadataProvider: jest.fn(() => ({
    onChange: jest.fn(),
  })),
}));
jest.mock('chalk', () => ({
  bold: arg => `BOLD(${arg})`,
  hex: () => ({ visible: arg => `HEX(${arg})` }),
  gray: arg => `GRAY(${arg})`,
}));

describe('Tests for bin.js', () => {
  it('should parse the arguments and select a channel', async () => {
    listen.mockReset();
    await run(['', '', 'p1']);
    expect(listen).toHaveBeenCalledWith('MOCKEDURL');
  });
  it('should call listen with the active channel url', async () => {
    listen.mockReset();
    await run(['', '']);
    expect(listen).toHaveBeenCalledWith('MOCKEDURL');
  });
  it('should clear the screen', async () => {
    clear.mockReset();
    await run(['', '']);
    expect(clear).toHaveBeenCalled();
  });
  it('should start an ora spinner and display the active channel name', async () => {
    const start = jest.fn();
    ora.mockReset();
    ora.mockImplementation(() => ({ start }));
    await run(['', '']);
    expect(ora).toHaveBeenCalledWith('Sveriges Radio P3');
    expect(start).toHaveBeenCalled();
  });
  it('should handle failing requests', async () => {
    const fail = jest.fn();
    const error = new Error();
    error.statusCode = 500;
    ora.mockReset();
    ora.mockImplementation(() => ({ fail }));
    createChannelProvider.mockImplementation(() => Promise.reject(error));
    await run(['', '']);
    expect(ora).toHaveBeenCalledWith('Sveriges Radio is currently not responding (Status Code: 500)');
    expect(fail).toHaveBeenCalled();
  });
  it('should handle request errors', async () => {
    const fail = jest.fn();
    const error = new Error();
    ora.mockReset();
    ora.mockImplementation(() => ({ fail }));
    createChannelProvider.mockImplementation(() => Promise.reject(error));
    await run(['', '']);
    expect(ora).toHaveBeenCalledWith('Could not connect to Sveriges Radio. Please check your connection.');
    expect(fail).toHaveBeenCalled();
  });
  it('should update on new meta data', async () => {
    const onChange = jest.fn();
    const spinner = { start: jest.fn() };
    const provider = { onChange };
    ora.mockReset();
    ora.mockImplementation(() => spinner);
    createChannelProvider.mockImplementation(() => ({
      select: jest.fn(),
      active: { liveaudio: { url: 'MOCKEDURL' }, name: 'P3' },
    }));
    createMetadataProvider.mockImplementation(() => provider);
    await run(['', '']);
    provider.currentProgram = 'PROGRAM';
    provider.currentSong = 'SONG';
    const onChangeListener = onChange.mock.calls[0][0];
    onChangeListener();
    expect(spinner.text).toEqual('BOLD(Sveriges Radio) HEX(P3): PROGRAMGRAY( - SONG)');
  });
});
