# slack-emoji-usage-report

A tool to crawl Slack channels and show usage report of emojis.

## Installation

```sh
$ git clone https://github.com/mangano-ito/slack-emoji-usage-report.git
$ cd slack-emoji-usage-report
$ npm install
```

## Prerequisites

You need your own **Slack API Token** to run this tool. Generate it beforehand if you don't have: https://api.slack.com/apps

You need permissions below:
- `channels:history`
- `channels:read`
- `emoji:read`
- `reactions:read`

## Usage

First try crawling the channels you want, then generate report.

### Caution

- Add a bot to the channel you want to report, if using a bot token.
- Using a user token, you need to join this channel.

### Crawl

#### With args target db & channel name

```sh
$ env SLACK_TOKEN="<slack token>" npm run crawl -- --db="<database name>" --channel="<channel name>"
```

#### Using dotenv

If using this mode, first you need run the command: `$ cp _env .env`.

```sh
$ npm run crawl
```

#### Parameters

- `SLACK_TOKEN`: Your Slack token
- `--channel`: Channel name to crawl
- `--db`: Database name to store result on
  - Anything is okay, but you need this on reporting.

Crawling takes a long time as forever if you have a ton of messages. It could fail in the midway but there's no option to retry from there. Try again and be patient!

```
$ npm run crawl -- --db=my_slack_workspace --channel=random

crawling random for emojis...
done.
:heart: found.
:hot_pepper: found.
:panda_face: found.
:heart: found.
```

When it's all done, the result is saved on database. Now you can generate report as mentioned below. Rerun crawling when you need updates.

### Report

When you have crawled all the channel to include in reports, it's ready to generate reports:

#### With args target db name

```sh
$ npm run report -- --db="<database name>"
```

#### Using dotenv

```sh
$ npm run report
```

#### Parameters

- `--channel`: Channel name you used in crawling.

This generates the report of total emoji usage report. The most used emoji comes first, the least last.

```
$ npm run report -- --db=my_slack_workspace

:heart: => 56
:grinning: => 40
:hot_pepper: => 30
:panda_face: => 20
:rolling_on_the_floor_laughing: => 1
:slightly_smiling_face: => 1
```
