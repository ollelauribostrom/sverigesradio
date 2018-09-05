import request from 'request';
import { listen } from '../src/listen';

jest.mock('speaker', () => jest.fn(() => ({ name: 'Speaker' })));
jest.mock('lame', () => ({
  Decoder: jest.fn(() => ({ name: 'Decoder' })),
  STEREO: 1,
}));

function createRequestSpy(response) {
  const requestSpy = jest.spyOn(request, 'get');
  requestSpy.mockImplementation(() => response);
  return requestSpy;
}

function createResponseObject() {
  return {
    stream: [],
    pipe(arg) {
      this.stream.push(arg.name);
      return this;
    },
  };
}

describe('Tests for listen.js', () => {
  it('should request the given stream url and ', () => {
    const requestSpy = createRequestSpy(createResponseObject());
    listen('stream-url');
    expect(requestSpy).toHaveBeenCalledWith('stream-url');
    requestSpy.mockRestore();
  });
  it('should pipe the response through the decoder to the speaker', () => {
    const response = createResponseObject();
    const requestSpy = createRequestSpy(response);
    listen('stream-url');
    expect(response.stream).toEqual(['Decoder', 'Speaker']);
    requestSpy.mockRestore();
  });
});
