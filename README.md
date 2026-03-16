# blockbeats-openclaw-skill

An [OpenClaw](https://openclaw.dev) skill for querying crypto news, newsflashes, articles, and on-chain market data via the [BlockBeats Pro API](https://www.theblockbeats.info/).

## Requirements

- [OpenClaw](https://openclaw.dev) installed
- `curl` available in your shell
- A BlockBeats Pro API key — apply at [theblockbeats.info](https://www.theblockbeats.info/)

## Installation

1. Clone this repository or download `SKILL.md`
2. Load the skill in OpenClaw:

```bash
openclaw skill add ./SKILL.md
```

3. Set your API key:

```bash
export BLOCKBEATS_API_KEY=your_api_key_here
```

## Features

| Scenario | Triggers |
|----------|----------|
| Market Overview | "How's the market today", "daily summary" |
| Capital Flow Analysis | "Where is capital flowing", "smart money", "on-chain trends" |
| Macro Environment Assessment | "Macro environment", "M2", "US Treasuries", "good time to enter" |
| Derivatives Market Analysis | "Futures market", "open interest", "Binance Bybit OI" |
| Keyword Search | "search [keyword]", "[keyword] news" |
| Newsflash & Article Lists | "latest news", "important newsflashes", "AI news", "financing news" |

## Example Prompts

```
How's the crypto market today?
Where is capital flowing on Solana?
What's the macro environment like?
Show me the latest AI newsflashes
Search for Ethereum news
What's the BTC ETF inflow trend?
```

## Skill Definition

The full skill definition is in [`SKILL.md`](./SKILL.md), which describes all scenarios, API endpoints, output formats, and interpretation rules.

## License

MIT
