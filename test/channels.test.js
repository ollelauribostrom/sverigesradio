import channels from '../src/channels';

describe('channels.js', () => {
  it('module should expose the correct properties', () => {
    expect(channels).toHaveProperty('P1');
    expect(channels).toHaveProperty('P2');
    expect(channels).toHaveProperty('P3');
    expect(channels).toHaveProperty('select');
  });
  it('active channel should default to P3', () => {
    expect(channels.active.name).toEqual('P3');
  });
  it('select should default to P3', () => {
    channels.select('Some nonexisting channel');
    expect(channels.active.name).toEqual('P3');
  });
  it('select should update the active channel', () => {
    channels.select('p1');
    expect(channels.active.name).toEqual('P1');
  });
  it('select should default to P3 when not passing any channel argument', () => {
    channels.select();
    expect(channels.active.name).toEqual('P3');
  });
});
