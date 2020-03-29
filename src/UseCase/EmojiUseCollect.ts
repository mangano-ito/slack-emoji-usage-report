import EmojiUse from '#/Model/EmojiUse';
import SlackChannelRepository from '#/Repository/Channel/SlackChannelRepository';
import SlackMessagesRepository from '#/Repository/Conversation/SlackMessageRepository';

export default class EmojiUseCollect {
    constructor(
        private channelName: string,
        private messageRepo: SlackMessagesRepository,
        private channelRepo: SlackChannelRepository,
    ) {}

    async *invoke(): AsyncGenerator<EmojiUse> {
        await this.channelRepo.init();
        const channel = this.channelRepo.findByName(this.channelName);
        if (!channel) {
            throw new Error('no channel found.');
        }

        for await (let message of this.messageRepo.fetchMessagesInChannel(channel)) {
            if (!message.reactions) {
                continue;
            }
            for (const reaction of message.reactions) {
                yield {
                    emoji:      reaction.name,
                    message_ts: message.ts,
                    use_count:  reaction.count,
                    user_to_id: message.user,
                    channel_id: channel.id,
                };
            }
        }
    }
}
