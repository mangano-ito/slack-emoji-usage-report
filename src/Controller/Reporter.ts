import EmojiTotalUsageReport from '#/UseCase/EmojiTotalUsageReport';
import SqliteEmojiUseRepository from '#/Repository/EmojiUse/SqliteEmojiUseRepository';

export default class Reporter {
    private emojiTotalUsageReport: EmojiTotalUsageReport;

    constructor(databaseName: string) {
        const emojiUseRepo = new SqliteEmojiUseRepository(databaseName);
        this.emojiTotalUsageReport = new EmojiTotalUsageReport(emojiUseRepo);
    }

    async run() {
        await this.emojiTotalUsageReport.invoke();
    }
}
