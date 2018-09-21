#! /usr/bin/env node

import commander from 'commander';
import clear from 'clear';
import ora from 'ora';
import { listen } from './listen';
import { createChannelProvider } from './channels';
import { version } from '../package.json';

export async function run(argv) {
  try {
    const channels = await createChannelProvider();
    commander
      .version(version)
      .arguments('[channelName]')
      .action(channel => channels.select(channel))
      .parse(argv);

    listen(channels.active.liveaudio.url);
    clear();
    ora(`Sveriges Radio ${channels.active.name}`).start();
  } catch (err) {
    if (err.statusCode) {
      ora(`Sveriges Radio is currently not responding (Status Code: ${err.statusCode})`).fail();
      return;
    }
    ora('Could not connect to Sveriges Radio. Please check your connection.').fail();
  }
}

if (process.env.NODE_ENV !== 'test') {
  run(process.argv);
}
