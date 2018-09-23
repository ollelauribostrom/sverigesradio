import request from 'request';
import { scheduleEndpoint, songEndpoint } from './config';
import { parseDate } from './utils';

export function getMetadata(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) {
        reject();
      }
      if (response && response.statusCode !== 200) {
        reject();
      }
      resolve(JSON.parse(body));
    });
  });
}

export async function updateCurrentProgram(provider) {
  try {
    const url = `${scheduleEndpoint}&channelid=${provider.channelId}`;
    const { channel } = await getMetadata(url);
    const { currentscheduledepisode: program } = channel;
    const duration = parseDate(program.endtimeutc) - Date.now();
    provider.currentProgram = program.title;
    provider.onChangeListeners.forEach(fn => fn());
    setTimeout(() => updateCurrentProgram(provider), duration);
  } catch (err) {
    provider.currentProgram = '';
    setTimeout(() => updateCurrentProgram(provider), 1000 * 60);
  }
}

export async function updateCurrentSong(provider) {
  try {
    const url = `${songEndpoint}&channelid=${provider.channelId}`;
    const { playlist } = await getMetadata(url);
    const { song, nextsong } = playlist;
    if (song) {
      const endtime = parseDate(song.stoptimeutc);
      const now = Date.now();
      if (endtime > now) {
        provider.currentSong = song.description;
        setTimeout(() => updateCurrentSong(provider), endtime - now);
      } else {
        provider.currentSong = '';
        const duration = nextsong ? parseDate(nextsong.starttimeutc) - now : 1000 * 10;
        setTimeout(() => updateCurrentSong(provider), duration);
      }
    } else {
      provider.currentSong = '';
      const duration = parseDate(nextsong.starttimeutc) - Date.now();
      setTimeout(() => updateCurrentSong(provider), duration);
    }
    provider.onChangeListeners.forEach(fn => fn());
  } catch (err) {
    provider.currentSong = '';
    setTimeout(() => updateCurrentSong(provider), 1000 * 60);
  }
}

export function createMetadataProvider(channelId) {
  const provider = {
    channelId,
    currentProgram: '',
    currentSong: '',
    onChangeListeners: [],
    onChange(fn) {
      this.onChangeListeners.push(fn);
    },
    setChannel(newChannelId) {
      this.channelId = newChannelId;
      updateCurrentProgram(this);
      updateCurrentSong(this);
    },
  };
  updateCurrentProgram(provider);
  updateCurrentSong(provider);
  return provider;
}
