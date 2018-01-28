import chai, { expect } from 'chai';
import channels from '../src/channels';

describe('channels.js', () => {
  it('module should expose the correct properties', () => {
    expect(channels).to.have.all.keys(['P1', 'P2', 'P3', 'active', 'select']);
  });
  it('active channel should be undefined at first', () => {
    expect(channels.active).to.be.an('undefined');
  });
  it('select should default to P3', () => {
    channels.select('Some nonexisting channel');
    expect(channels.active.name).to.equal('P3');
  });
  it('select should update the active channel', () => {
    channels.select('p1');
    expect(channels.active.name).to.equal('P1');
  });
});
