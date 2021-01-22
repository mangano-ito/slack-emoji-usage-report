import commandLineArgs, { OptionDefinition } from 'command-line-args';
import * as config from "../config";

import CrawlOptions from "#/Model/CrawlOptions";

const optionDefinitions: OptionDefinition[] = [
    {
        name: 'db',
        alias: 'd',
        type: String,
    },
    {
        name: 'channel',
        alias: 'c',
        type: String,
    },
];

export default (): CrawlOptions => {
    const token = process.env['SLACK_TOKEN'] || config.Slack.TOKEN;
    if (!token) {
        throw new Error('SLACK_TOKEN is not defined.');
    }

    const options = commandLineArgs(optionDefinitions, { partial: true });
    const channel_name = options.channel || config.Slack.CHANNEL_NAME;
    const database_name = options.db || config.SQLite.DB_NAME;
    if (!channel_name || !database_name) {
        throw new Error(`--channel and --db must be given.`);
    }

    return {token, channel_name, database_name};
};
