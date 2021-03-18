import { WebClient } from '@slack/web-api';

import EmojiTotalUsageReport from '#/UseCase/EmojiTotalUsageReport';
import EmojiTotalUsageReportToSlack from '#/UseCase/EmojiTotalUsageReportToSlack';
import SqliteEmojiUseRepository from '#/Repository/EmojiUse/SqliteEmojiUseRepository';

import * as config from '../config';

export default class Reporter {
    private emojiTotalUsageReport: EmojiTotalUsageReport;
    private emojiTotalUsageReportToSlack: EmojiTotalUsageReportToSlack;

    constructor(databaseName: string) {
        const emojiUseRepo = new SqliteEmojiUseRepository(databaseName);
        this.emojiTotalUsageReport = new EmojiTotalUsageReport(emojiUseRepo);
        this.emojiTotalUsageReportToSlack = new EmojiTotalUsageReportToSlack(emojiUseRepo, new WebClient(config.Slack.TOKEN))
    }

    async run() {
        await this.emojiTotalUsageReport.invoke();
    }
    async runSlack() {
        await this.emojiTotalUsageReportToSlack.invoke();
    }
}
