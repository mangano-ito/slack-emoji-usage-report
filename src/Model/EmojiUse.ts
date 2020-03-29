type Emoji = string;
type UserId = string;
type MessageTimestamp = string;
type ChannelId = string;

export default interface EmojiUse {
    /** emoji */
    emoji:      Emoji;
    /** parent message emoji attached to (timestamp should be unique in channel) */
    message_ts: MessageTimestamp;
    /** count of use */
    use_count:  number;
    /** user who posted parent message */
    user_to_id: UserId;
    /** channel where message is */
    channel_id: ChannelId;
}
