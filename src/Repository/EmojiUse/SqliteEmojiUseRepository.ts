import sqlite, { Database } from 'sqlite';
import SQL from 'sql-template-strings';

import EmojiUse from '#/Model/EmojiUse';
import EmojiTotalUsage from '#/Model/EmojiTotalUsage';

export enum OrderBy {
    MOST_USED,
    LEAST_USED,
}

const ORDER_BY_QUERY = {
    [OrderBy.MOST_USED]:  'use_count DESC',
    [OrderBy.LEAST_USED]: 'use_count ASC',
};

export default class SqliteEmojiUseRepository {
    private database: Promise<Database>;

    /**
     * @param name name of database, which is used for database file name
     */
    constructor(private name: string) {
        this.database = this.openDb();
    }

    /**
     * open local sqlite database
     * @returns database opened
     */
    private async openDb(): Promise<Database> {
        const db = await sqlite.open(`./var/${this.name}.sqlite`);
        await db.migrate({});

        return db;
    }

    async add(use: EmojiUse): Promise<void> {
        const db = await this.database;
        const sql = SQL`
            INSERT INTO   emoji_uses
                          (emoji, message_ts, use_count, user_to_id, channel_id)
                   VALUES (${use.emoji}, ${use.message_ts}, ${use.use_count}, ${use.user_to_id}, ${use.channel_id})
        `;
        try {
            await db.run(sql);
        } catch (e) {
            // ignore unique constraint failures
            if (e.errno != 19) {
                throw e;
            }
        }
    }

    async *fetchTotalUsage(orderBy: OrderBy = OrderBy.MOST_USED): AsyncGenerator<EmojiTotalUsage> {
        const db = await this.database;

        let rows: EmojiTotalUsage[] = [];
        let offset = 0;
        do {
            const sql = `
                SELECT   emoji, SUM(use_count) AS use_count
                FROM     emoji_uses
                GROUP BY emoji
                ORDER BY ${ORDER_BY_QUERY[orderBy]}
                LIMIT    ${offset}, 100
            `;
            rows = await db.all(sql);
            for (const row of rows) {
                yield row;
            }
            offset += rows.length;
        } while (rows.length > 0);
    }
}
