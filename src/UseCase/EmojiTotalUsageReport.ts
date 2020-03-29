import SqliteEmojiUseRepository from "#/Repository/EmojiUse/SqliteEmojiUseRepository";

export default class EmojiTotalUsageReport {
    constructor(private emojiUseRepo: SqliteEmojiUseRepository) {}

    async invoke() {
        for await (const emojiUse of this.emojiUseRepo.fetchTotalUsage()) {
            console.log(`:${emojiUse.emoji}: => ${emojiUse.use_count}`);
        }
    }
}
