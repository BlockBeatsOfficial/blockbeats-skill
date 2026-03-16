# blockbeats-mcp

BlockBeats Pro API MCP Server，为 Claude 提供加密货币快讯、文章、搜索和链上市场数据查询能力。

## 使用方法

### 前置条件

- Node.js 18+
- BlockBeats API Key（[申请地址](https://www.theblockbeats.info/)）
- Claude Desktop

### 配置 Claude Desktop

编辑配置文件：
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`
- **Mac**：`~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "blockbeats": {
      "command": "npx",
      "args": ["-y", "blockbeats-mcp"],
      "env": {
        "BLOCKBEATS_API_KEY": "你的API密钥"
      }
    }
  }
}
```

重启 Claude Desktop 后即可使用。

## 支持的工具

| 工具 | 说明 |
|------|------|
| `get_newsflash` | 快讯列表（全部/重要/原创/首发/链上/融资/预测/AI）|
| `get_articles` | 文章列表（全部/重要/原创）|
| `search_news` | 关键词搜索 |
| `get_btc_etf_flow` | BTC ETF 净流入 |
| `get_daily_onchain_tx` | 每日链上交易量 |
| `get_ibit_fbtc_flow` | IBIT/FBTC 净流入 |
| `get_stablecoin_marketcap` | 稳定币市值 |
| `get_compliant_exchange_total` | 合规交易所总资产 |
| `get_us_treasury_yield` | 美债收益率 |
| `get_dxy_index` | 美元指数（DXY）|
| `get_m2_supply` | 全球 M2 供应量 |
| `get_bitfinex_long_positions` | Bitfinex 多头持仓 |
| `get_contract_oi_data` | 合约平台 OI 数据 |
| `get_sentiment_indicator` | 抄底逃顶情绪指标 |
| `get_top10_netflow` | 链上净流入前十代币 |
| `get_exchange_rankings` | 合约交易所排名 |

## 使用示例

配置完成后，直接在 Claude 中对话：

```
今天 BTC ETF 流入多少？
最新的重要快讯有哪些？
搜索 Solana 相关新闻
现在宏观环境适合入场吗？
链上资金在流向哪里？
```

## License

MIT
