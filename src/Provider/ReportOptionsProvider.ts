import commandLineArgs, { OptionDefinition } from 'command-line-args';
import * as config from "../config";

import ReportOptions from "#/Model/ReportOptions";

const optionDefinitions: OptionDefinition[] = [
    {
        name: 'db',
        alias: 'd',
        type: String,
    },
    {
        name: 'isPostSlack',
        alias: 's',
        type: String,
    }
];

export default (): ReportOptions => {
    const options = commandLineArgs(optionDefinitions, { partial: true });

    return {
        database_name: options.db || config.SQLite.DB_NAME
    };
};
