import type { StrapiCommand } from '../../types';
import { runAction } from '../../utils/helpers';
import action from './action';

/**
 * `$ strapi start`
 */
const command: StrapiCommand = ({ command }) => {
  command
    .command('start')
    .description('Start your Strapi application\nATTACHED PACKAGE @strapi/strapi\nVERSION 3.1')
    .action(runAction('start', action));
};

export default command;
