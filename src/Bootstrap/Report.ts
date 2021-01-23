import * as config from "../config";

import Reporter from "#/Controller/Reporter";
import provideOptions from "#/Provider/ReportOptionsProvider";

export default async() => {
    const options = provideOptions();
    await new Reporter(options.database_name || config.SQLite.DB_NAME).run();
    await new Reporter(options.database_name || config.SQLite.DB_NAME).runSlack();
};
