import { WebClient } from '@slack/web-api';

import EmojiUseCollect from '#/UseCase/EmojiUseCollect';
import EmojiUseStore from '#/UseCase/EmojiUseStore';
import SqliteEmojiUseRepository from '#/Repository/EmojiUse/SqliteEmojiUseRepository';
import SlackMessagesRepository from '#/Repository/Conversation/SlackMessageRepository';
import SlackChannelRepository from '#/Repository/Channel/SlackChannelRepository';

export default class Crawler {
    private emojiUseCollect: EmojiUseCollect;
    private emojiUseStore: EmojiUseStore;

    constructor(
        token: string,
        private channelName: string,
        databaseName: string,
    ) {
        const client = new WebClient(token);
        const channelRepo = new SlackChannelRepository(client);
        const messageRepo = new SlackMessagesRepository(client);
        const emojiUseRepo = new SqliteEmojiUseRepository(databaseName);
        this.emojiUseCollect = new EmojiUseCollect(channelName, messageRepo, channelRepo);
        this.emojiUseStore = new EmojiUseStore(emojiUseRepo);
    }

    async run() {
        console.log(`crawling ${this.channelName} for emojis...`);
        this.emojiUseStore.invoke(
            this.emojiUseCollect.invoke()
        );
        console.log('done.');
    }

}
