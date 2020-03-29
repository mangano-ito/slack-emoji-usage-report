-- Up
CREATE TABLE emoji_uses(
    id         INTEGER       PRIMARY KEY AUTOINCREMENT,
    emoji      VARCHAR(1024) NOT NULL,
    message_ts VARCHAR(1024) NOT NULL,
    use_count  INTEGER       NOT NULL DEFAULT 0,
    user_to_id VARCHAR(1024) NOT NULL,
    channel_id VARCHAR(1024) NOT NULL,

    UNIQUE (message_ts, emoji)
);
CREATE INDEX idx_emoji_uses_emoji   ON emoji_uses(emoji);
CREATE INDEX idx_emoji_uses_user_to ON emoji_uses(user_to_id);
CREATE INDEX idx_emoji_uses_channel ON emoji_uses(channel_id);
CREATE INDEX idx_emoji_use_count    ON emoji_uses(use_count);

-- Down
DROP TABLE emoji_uses;