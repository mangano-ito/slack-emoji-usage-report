import { WebClient, WebAPICallResult } from '@slack/web-api';
import Channel, { ChannelId } from '#/Model/Channel';

interface ChannelsResult extends WebAPICallResult {
    channels: Channel[];
}

/**
 * Slack Channel Repository 
 */
export default class SlackChannelRepository {
    private channelsById = new Map<ChannelId, Channel>();
    private channelsByName = new Map<string, Channel>();

    /**
     * @param client Slack Web API client
     */
    constructor(private client: WebClient) {}

    /**
     * fetch and store channel list from remote
     */
    async init(): Promise<this> {
        const paginatedChannelsResult = this.client.paginate('conversations.list') as AsyncIterableIterator<ChannelsResult>;
        for await (const channelsResult of paginatedChannelsResult) {
            for (const channel of channelsResult.channels) {
                this.channelsById.set(channel.id, channel);
                this.channelsByName.set(channel.name, channel);
            }
        }

        return this;
    }

    /**
     * find channel by ID
     * 
     * @param id channel ID
     * @returns channel found (undefined if not)
     */
    findById(id: ChannelId): Channel | undefined {
        return this.channelsById.get(id);   
    }

    /**
     * find channel by name
     *
     * @param name channel name
     * @returns channel found (undefined if not)
     */
    findByName(name: string): Channel | undefined {
        return this.channelsByName.get(name);
    }
}
