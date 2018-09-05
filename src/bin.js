#! /usr/bin/env node

import commander from 'commander';
import clear from 'clear';
import ora from 'ora';
import { listen } from './listen';
import { createChannelProvider } from './channels';
import { version } from '../package.json';

export function run(argv) {
  const channels = createChannelProvider();
  commander
    .version(version)
    .arguments('[channelName]')
    .action(channel => channels.select(channel))
    .parse(argv);

  listen(channels.active.url);
  clear();
  ora(`Sveriges Radio ${channels.active.name}`).start();
}

if (process.env.NODE_ENV !== 'test') {
  run(process.argv);
}
