#! /usr/bin/env node

import commander from 'commander';
import clear from 'clear';
import ora from 'ora';
import listen from './listen';
import channels from './channels';
import { version } from '../package.json';

commander
  .version(version)
  .arguments('[channelName]')
  .action(channelName => channels.select(channelName))
  .parse(process.argv);

listen(channels.active.url);
clear();
ora(`Sveriges Radio ${channels.active.name}`).start();
