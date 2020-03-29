import { WebClient, WebAPICallResult } from '@slack/web-api';

import Channel from '#/Model/Channel';
import Message from '#/Model/Message';

interface MessagesResult extends WebAPICallResult {
    messages: Message[];
}

export default class SlackMessagesRepository {
    /**
     * @param client Slack Web API Client
     */
    constructor(private client: WebClient) {}

    /**
     * fetch messages posted in given `channel`
     * @param channel channel to fetch message in
     * @return messages
     */
    async *fetchMessagesInChannel(channel: Channel): AsyncGenerator<Message> {
        const paginatedMessagesResult = this.client.paginate(
            'conversations.history',
            {channel: channel.id}
        ) as AsyncIterableIterator<MessagesResult>;
        for await (const messagesResult of paginatedMessagesResult) {
            for (const message of messagesResult.messages) {
                yield message;
            }
        }
    }
}
