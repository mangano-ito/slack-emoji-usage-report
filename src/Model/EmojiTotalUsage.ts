type Emoji = string;

export default interface EmojiTotalUsage {
    /** emoji */
    emoji:     Emoji;
    /** use count of emoji in total */
    use_count: number;
}
