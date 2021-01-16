const config = require("dotenv").config().parsed;

for (const key in config) {
  process.env[key] = config[key];
}
export namespace Slack {
  export const TOKEN = process.env.SLACK_TOKEN as string;
  export const SOCKET_TOKEN = process.env.SLACK_SOCKET_TOKEN as string;
  export const CHANNEL_NAME = process.env.SLACK_CHANNEL_NAME as string;
  export const PORT = process.env.PORT as string;
}

export namespace SQLite {
    export const DB_NAME = process.env.DB_NAME as string;
}

// TODO: I wanna use slash command by Slack #2 
// export namespace General {
//     export const MODE = process.env.MODE as string;
// }
