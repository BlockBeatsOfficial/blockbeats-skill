# blockbeats-openclaw-skill

An [OpenClaw](https://openclaw.dev) skill for querying crypto news, newsflashes, articles, and on-chain market data via the [BlockBeats Pro API](https://www.theblockbeats.info/).

## Features

- **Market Overview** — sentiment index, BTC ETF inflows, on-chain volume, key headlines
- **Capital Flow Analysis** — top 10 on-chain net inflows, stablecoin market cap, ETF data
- **Macro Environment Assessment** — Global M2, US 10Y Treasury yield, DXY Dollar Index
- **Derivatives Market Analysis** — platform OI comparison, exchange rankings, Bitfinex longs
- **Keyword Search** — full-text search across newsflashes and articles
- **Newsflash & Article Lists** — all categories: important, original, first-report, on-chain, financing, prediction market, AI

## Requirements

- [OpenClaw](https://openclaw.dev) installed
- `curl` available in your shell
- A BlockBeats Pro API key — apply at [theblockbeats.info](https://www.theblockbeats.info/)

## Installation

```bash
npm install -g blockbeats-openclaw-skill
```

Then set your API key:

```bash
export BLOCKBEATS_API_KEY=your_api_key_here
```

## Usage

Once installed, the skill is automatically available in OpenClaw. Example prompts:

```
How's the crypto market today?
Where is capital flowing on Solana?
What's the macro environment like?
Show me the latest AI newsflashes
Search for Ethereum news
What's the BTC ETF inflow trend?
```

## Skill File

The skill definition is in [`SKILL.md`](./SKILL.md), which describes all available scenarios, API endpoints, output formats, and interpretation rules.

## API Reference

**Base URL**: `http://api-pro.theblockbeats.info`
**Auth**: All requests require header `api-key: $BLOCKBEATS_API_KEY`

Key endpoints:

| Category | Endpoint |
|----------|----------|
| Newsflashes | `GET /v1/newsflash` |
| Articles | `GET /v1/article` |
| Search | `GET /v1/search` |
| BTC ETF | `GET /v1/data/btc_etf` |
| On-chain top 10 | `GET /v1/data/top10_netflow` |
| Stablecoin market cap | `GET /v1/data/stablecoin_marketcap` |
| Global M2 | `GET /v1/data/m2_supply` |
| DXY | `GET /v1/data/dxy` |
| Sentiment index | `GET /v1/data/bottom_top_indicator` |

See [`SKILL.md`](./SKILL.md) for the full endpoint reference.

## License

MIT
