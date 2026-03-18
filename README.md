# blockbeats-openclaw-skill

An [OpenClaw](https://openclaw.dev) skill for querying crypto news, newsflashes, articles, and on-chain market data via the [BlockBeats Pro API](https://www.theblockbeats.info/).

## What Can It Do

### 📊 Market Overview
Ask: *"How's the market today?"* / *"Give me a daily summary"*

Fetches in parallel:
- **Sentiment index** — buy/sell zone indicator (< 20 potential buy, > 80 potential sell)
- **BTC ETF net inflow** — daily & cumulative institutional flow
- **On-chain transaction volume** — day-over-day change
- **Top important newsflashes** — latest 5 key headlines

### 💰 Capital Flow Analysis
Ask: *"Where is capital flowing?"* / *"Which tokens are being bought on-chain?"*

- **Top 10 on-chain net inflow tokens** — supports Solana / Base / Ethereum
- **Stablecoin market cap** — USDT & USDC expansion/contraction signal
- **BTC ETF institutional flow** — daily inflow/outflow

### 🌐 Macro Environment Assessment
Ask: *"Is it a good time to enter?"* / *"What's the macro situation?"*

- **Global M2 supply** — YoY trend (expansionary vs contractionary)
- **US 10Y Treasury yield** — risk-free rate pressure on crypto
- **DXY Dollar Index** — dollar strength impact on risk assets
- **Compliant exchange total assets** — institutional allocation appetite

### ⚡ Derivatives Market Analysis
Ask: *"What's the futures market doing?"* / *"Show me open interest"*

- **Platform OI comparison** — Binance, Bybit, Hyperliquid side by side
- **Exchange rankings** — by volume and open interest (top 10)
- **Bitfinex BTC long positions** — large player leveraged sentiment signal

### 🔍 Keyword Search
Ask: *"Search Solana"* / *"Find news about BlackRock"*

Full-text search across all newsflashes and articles. Returns title, abstract, type (article vs newsflash), relative time, and source URL.

### 📰 Newsflash & Article Lists
Ask for any category:

| Category | Trigger |
|----------|---------|
| All newsflashes | latest news, what's new |
| Important | major events, key headlines |
| Original | exclusive coverage |
| First-report | scoop, first to report |
| On-chain | on-chain data updates |
| Financing | VC deals, fundraising rounds |
| Prediction market | Polymarket, forecast, betting |
| AI | AI projects, artificial intelligence news |
| Articles | in-depth analysis, research |
| Important articles | key reports |
| Original articles | original analysis |

## Data Coverage

| Data | Update Frequency |
|------|-----------------|
| Newsflashes & articles | Real-time |
| Top 10 on-chain net inflow | Near real-time |
| BTC ETF / daily on-chain volume | Daily (T+1) |
| Stablecoin market cap | Daily |
| Sentiment index | Daily |
| US Treasury yield / DXY | Intraday (minute-level) |
| Global M2 supply | Monthly |
| Exchange & derivatives OI | Daily |
| Bitfinex long positions | Daily (24h param = near real-time) |

## Requirements

- `curl` available in your shell
- A BlockBeats Pro API key — apply at [theblockbeats.info](https://www.theblockbeats.info/)
- Set environment variable: `BLOCKBEATS_API_KEY=your_key`

## Supported Platforms

macOS · Linux · Windows

## License

MIT
