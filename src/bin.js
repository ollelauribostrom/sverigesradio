#! /usr/bin/env node

import commander from 'commander';
import clear from 'clear';
import ora from 'ora';
import chalk from 'chalk';
import { listen } from './listen';
import { createChannelProvider } from './channels';
import { version } from '../package.json';
import { createMetadataProvider } from './metadata';

export function updateSpinner(spinner, channel, { currentProgram, currentSong }) {
  const program = currentProgram ? `: ${currentProgram}` : '';
  const song = currentSong ? ` - ${currentSong}` : '';
  spinner.text = `${chalk.bold('Sveriges Radio')} ${chalk.hex(channel.color).visible(channel.name)}${program}${chalk.gray(song)}`;
}

export async function run(argv) {
  try {
    const channels = await createChannelProvider();
    commander
      .version(version)
      .arguments('[channelName]')
      .action(channel => channels.select(channel))
      .parse(argv);
    listen(channels.active.liveaudio.url);
    const spinner = ora(`Sveriges Radio ${channels.active.name}`);
    const metadata = createMetadataProvider(channels.active.id);
    metadata.onChange(() => updateSpinner(spinner, channels.active, metadata));
    clear();
    spinner.start();
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
