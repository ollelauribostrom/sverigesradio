import request from 'request';
import Speaker from 'speaker';
import { Decoder, STEREO } from 'lame';

export function listen(streamUrl) {
  const decoder = new Decoder();
  const speaker = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100,
    mode: STEREO,
  });
  request
    .get(streamUrl)
    .pipe(decoder)
    .pipe(speaker);
}
