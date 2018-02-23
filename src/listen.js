import request from 'request';
import Speaker from 'speaker';
import lame from 'lame';

const speaker = new Speaker({
  channels: 2,
  bitDepth: 16,
  sampleRate: 44100,
  mode: lame.STEREO,
});

const decoder = new lame.Decoder();

export default function (streamUrl) {
  request
    .get(streamUrl)
    .pipe(decoder)
    .pipe(speaker);
}
