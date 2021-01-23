import { ChatPostMessageArguments, WebClient } from "@slack/web-api";
import { KnownBlock } from "@slack/types";

import SqliteEmojiUseRepository from "#/Repository/EmojiUse/SqliteEmojiUseRepository";
import * as config from "../config";

const addEmojiContext = (emoji: string, use_count: string): KnownBlock => {
    return {
        "type": "context",
        "elements": [
            {
                "type": "mrkdwn",
                "text": `:${emoji}: \`:${emoji}:\` is count *${use_count}*`
            }
        ]
    }
}

const sendMessage = async (client: WebClient, blocks: KnownBlock []) => {
    const msgOption: ChatPostMessageArguments = {
        // token: config.Slack.SOCKET_TOKEN,
        // token: config.Slack.TOKEN,
        channel: config.Slack.CHANNEL_NAME,
        text: 'this is a emoji usage report',
        blocks,
    };
    await client.chat.postMessage(msgOption);
}

export default class EmojiTotalUsageReportToSlack {
    constructor(
        private emojiUseRepo: SqliteEmojiUseRepository,
        private client: WebClient
    ) {}

    private blocks: KnownBlock [] = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*this is a emoji usage report :smile:* !!"
            }
        }
    ];

    async invoke() {
        let increment = 0;
        for await (const emojiUse of this.emojiUseRepo.fetchTotalUsage()) {
            increment++;
            if (increment < 50) {
                console.log(`:${emojiUse.emoji}: => ${emojiUse.use_count}`);
                this.blocks.push(addEmojiContext(emojiUse.emoji, `${emojiUse.use_count}`));
            }
        }
        await sendMessage(this.client, this.blocks);
    }
}
