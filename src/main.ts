import crawl from '#/Bootstrap/Crawl';
import report from '#/Bootstrap/Report';
import provideOptions from './Provider/MainOptionsProvider';

(async () => {
    const mode = provideOptions();
    switch (mode) {
        case 'crawl':
            await crawl();
            break;
        case 'report':
            await report();
            break;
        case 'slack':
            await crawl();
            await report();
            break;
    }
})();
