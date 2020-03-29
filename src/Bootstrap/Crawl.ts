import Crawler from '#/Controller/Crawler';
import provideOptions from '#/Provider/CrawlOptionsProvider';

export default async () => {
    const options = provideOptions();
    await new Crawler(
        options.token,
        options.channel_name,
        options.database_name
    ).run();
};
