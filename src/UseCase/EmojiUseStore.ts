import SqliteEmojiUseRepository from '#/Repository/EmojiUse/SqliteEmojiUseRepository';
import EmojiUse from '#/Model/EmojiUse';

export default class EmojiUseStore {
    constructor(private emojiUseRepo: SqliteEmojiUseRepository) {}

    async invoke(emojiUses: AsyncGenerator<EmojiUse>) {
        for await (const emojiUse of emojiUses) {
            console.log(`:${emojiUse.emoji}: found.`);
            this.emojiUseRepo.add(emojiUse);
        }
    }

}
