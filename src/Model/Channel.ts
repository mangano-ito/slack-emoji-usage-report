export type ChannelId = string;

export default interface Channel {
    /** ID of channel (e.g. "C012XY3456Z") */
    id:   ChannelId;
    /** name of channel (e.g. "general") */
    name: string;
}
