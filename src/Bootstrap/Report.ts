import Reporter from "#/Controller/Reporter";
import provideOptions from "#/Provider/ReportOptionsProvider";

export default async() => {
    const options = provideOptions();
    await new Reporter(options.database_name).run();
};
