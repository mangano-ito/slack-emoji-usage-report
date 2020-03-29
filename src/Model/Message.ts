import Reaction from '#/Model/Reaction';

export default interface Message {
    client_msg_id: string;
    type:          string;
    channel:       string;
    user:          string;
    text:          string;
    ts:            string;
    reactions?:    Reaction[];
}