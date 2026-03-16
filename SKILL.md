---
name: blockbeats-news
description: BlockBeats API skill for querying crypto news, newsflashes, articles, search, and on-chain market data (ETF flows, stablecoin supply, derivatives OI, M2, DXY, Bitfinex long positions, and more). Requires BLOCKBEATS_API_KEY.
metadata:
  openclaw:
    emoji: "📰"
    requires:
      bins:
        - curl
    os:
      - darwin
      - linux
      - win32
    tags:
      - crypto
      - news
      - market-data
      - on-chain
      - defi
  version: 2.2.0
---

# BlockBeats API Skill

通过 BlockBeats Pro API 查询加密货币快讯、文章、搜索和链上市场数据。

**Base URL**: `http://api-pro.theblockbeats.info`
**认证**: 所有请求需携带 Header `api-key: $BLOCKBEATS_API_KEY`
**响应格式**: `{"status": 0, "message": "", "data": {...}}` — status 为 0 表示成功

---

## 场景一：市场速览

**触发词**: 今天市场怎么样、行情如何、市场概况、每日速览

并行执行以下四个请求：

```bash
# 1. 市场情绪指数
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/bottom_top_indicator"

# 2. 重要快讯（最新5条）
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/newsflash/important" \
  -G --data-urlencode "size=5" --data-urlencode "lang=cn"

# 3. BTC ETF 净流入
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/btc_etf"

# 4. 每日链上交易量
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/daily_tx"
```

**输出格式**:
```
📊 市场速览 · [今日日期]

情绪指数：[数值] → [<20 潜在买入区间 / 20-80 中性 / >80 潜在卖出区间]
BTC ETF：今日净流入 [数值] 百万美元，累计 [数值] 百万
链上交易量：今日 [数值]（较昨日 [↑/↓][涨跌幅]）
重要快讯：
  · [标题1] [时间]
  · [标题2] [时间]
  · [标题3] [时间]
```

**解读规则**:
- 情绪指数 < 20 → 提示用户关注潜在机会
- 情绪指数 > 80 → 提示注意卖出风险
- ETF 连续3日正流入 → 机构入场信号
- ETF 净流入 > 500M/天 → 强买入信号
- 链上交易量持续增长 → 链上活跃度上升，市场热度提高

---

## 场景二：资金流向分析

**触发词**: 资金流向哪里、链上热点、哪个币在被买入、稳定币、聪明钱

并行执行：

```bash
# 1. 链上净流入前十代币（默认 solana，用户提到 Base/ETH 时替换 network 参数）
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/top10_netflow" \
  -G --data-urlencode "network=solana"

# 2. 稳定币市值
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/stablecoin_marketcap"

# 3. BTC ETF 净流入
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/btc_etf"
```

network 参数根据用户意图选择：`solana`（默认）/ `base` / `ethereum`

**输出格式**:
```
💰 资金流向分析

链上热门（[链名]）：
  1. [代币] 净流入 $[数值]  市值 $[数值]
  2. ...

稳定币：USDT [↑涨/↓跌] USDC [↑涨/↓跌]（扩张/收缩信号）
机构资金：ETF 今日 [流入/流出] [数值] 百万美元
```

**解读规则**:
- 稳定币市值持续扩张 → 场内资金增加，买盘潜力强
- 稳定币市值收缩 → 资金出场，谨慎

---

## 场景三：宏观环境判断

**触发词**: 宏观环境、适合入场吗、流动性、美债、美元、M2、大环境

并行执行：

```bash
# 1. 全球 M2 供应量
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/m2_supply" \
  -G --data-urlencode "type=1Y"

# 2. 美债收益率
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/us10y" \
  -G --data-urlencode "type=1M"

# 3. DXY 美元指数
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/dxy" \
  -G --data-urlencode "type=1M"

# 4. 合规交易所总资产
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/compliant_total"
```

**输出格式**:
```
🌐 宏观环境判断

全球 M2：[最新值] 同比 [↑/↓][涨跌幅] → [宽松/收缩]
美债收益率（10Y）：[最新值]% → [上升/下降趋势]
美元指数（DXY）：[最新值] → [强势/弱势]
合规交易所总资产：$[数值] → [流入/流出趋势]

综合判断：[利好/中性/利空] 加密市场
```

**解读规则**:
- M2 同比增长 > 5% → 流动性宽松，利好风险资产
- M2 同比增长 < 0% → 流动性收缩，谨慎
- DXY 持续上涨 → 美元强势，加密承压
- DXY 持续下跌 → 美元走弱，加密受益
- 美债收益率上升 → 无风险收益率提高，资金回流债市
- 合规交易所资产增加 → 机构配置意愿增强

---

## 场景四：合约市场分析

**触发词**: 合约市场、多空情况、未平仓合约、Binance Bybit 合约量、杠杆风险

并行执行：

```bash
# 1. 主流合约平台对比
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/contract" \
  -G --data-urlencode "dataType=1D"

# 2. 合约交易所快照
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/exchanges" \
  -G --data-urlencode "size=10"

# 3. Bitfinex BTC 多头持仓
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/data/bitfinex_long" \
  -G --data-urlencode "symbol=btc" --data-urlencode "type=1D"
```

**输出格式**:
```
⚡ 合约市场分析

主流平台 OI：
  Binance [数值]  Bybit [数值]  Hyperliquid [数值]

交易所排名（按成交量）：
  1. [名称] 成交额 $[数值]  OI $[数值]
  2. ...

Bitfinex BTC 多头持仓：[数值] → [增加/减少]（杠杆多头情绪 [强/弱]）
```

**解读规则**:
- Bitfinex 多头持仓持续增加 → 大户看多，市场信心增强
- Bitfinex 多头持仓骤降 → 警惕多头平仓引发下跌

---

## 场景五：关键词搜索

**触发词**: 搜索 [关键词]、查找 [关键词]、[关键词] 相关新闻、[关键词] 有什么消息

```bash
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/search" \
  -G --data-urlencode "name=[关键词]" --data-urlencode "size=10" --data-urlencode "lang=cn"
```

返回字段：`title`、`abstract`、`content`（纯文本）、`type`（0=文章 1=快讯）、`time_cn`（相对时间）、`url`

---

## 场景六：快讯与文章列表

根据用户意图选择对应快讯分类或文章接口，默认返回10条，支持 `size` 参数调整数量。

**快讯分类触发词与接口对照**：

| 用户说 | 接口路径 |
|--------|---------|
| 最新快讯 / 快讯列表 / 有什么新消息 | `/v1/newsflash` |
| 重要快讯 / 重点新闻 / 大事件 | `/v1/newsflash/important` |
| 原创快讯 / 原创报道 | `/v1/newsflash/original` |
| 首发快讯 / 独家 / 独家快讯 | `/v1/newsflash/first` |
| 链上快讯 / 链上数据 / 链上动态 / 链上消息 | `/v1/newsflash/onchain` |
| 融资快讯 / 融资新闻 / 哪些项目融资 / 投融资动态 | `/v1/newsflash/financing` |
| 预测市场 / Polymarket / 博彩 / 预测 | `/v1/newsflash/prediction` |
| AI 快讯 / AI 新闻 / 人工智能动态 / AI 项目 | `/v1/newsflash?type=ai` |

**文章分类触发词与接口对照**：

| 用户说 | 接口路径 |
|--------|---------|
| 文章列表 / 深度文章 / 最新文章 | `/v1/article` |
| 重要文章 / 重点报道 | `/v1/article/important` |
| 原创文章 / 原创深度 | `/v1/article/original` |

**请求示例**（以 AI 快讯为例）：

```bash
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/newsflash" \
  -G --data-urlencode "type=ai" --data-urlencode "page=1" --data-urlencode "size=10" --data-urlencode "lang=cn"
```

**输出格式**：

```
📰 [分类名称] · 最新 [N] 条

1. [标题] [time_cn]
   [abstract 摘要，如有]

2. [标题] [time_cn]
   [abstract 摘要，如有]
...
```

**注意**：
- `content` 为 HTML，展示时剥离标签只显示纯文本
- 文章类接口额外返回 `url` 字段，可附上原文链接

---

## 单接口参考

### 快讯接口（均支持 page/size/lang）

| 接口 | URL |
|------|-----|
| 全部快讯 | `GET /v1/newsflash` |
| 重要快讯 | `GET /v1/newsflash/important` |
| 原创快讯 | `GET /v1/newsflash/original` |
| 首发快讯 | `GET /v1/newsflash/first` |
| 链上快讯 | `GET /v1/newsflash/onchain` |
| 融资快讯 | `GET /v1/newsflash/financing` |
| 预测市场快讯 | `GET /v1/newsflash/prediction` |
| AI 快讯 | `GET /v1/newsflash?type=ai` |

```bash
curl -s -H "api-key: $BLOCKBEATS_API_KEY" \
  "http://api-pro.theblockbeats.info/v1/newsflash/[type]" \
  -G --data-urlencode "page=1" --data-urlencode "size=10" --data-urlencode "lang=cn"
```

### 文章接口（均支持 page/size/lang）

| 接口 | URL |
|------|-----|
| 全部文章 | `GET /v1/article` |
| 重要文章 | `GET /v1/article/important` |
| 原创文章 | `GET /v1/article/original` |

### 数据接口

| 接口 | URL | 关键参数 |
|------|-----|---------|
| BTC ETF 净流入 | `GET /v1/data/btc_etf` | 无 |
| 每日链上交易量 | `GET /v1/data/daily_tx` | 无 |
| IBIT/FBTC 净流入 | `GET /v1/data/ibit_fbtc` | 无 |
| 稳定币市值 | `GET /v1/data/stablecoin_marketcap` | 无 |
| 合规交易所总资产 | `GET /v1/data/compliant_total` | 无 |
| 美债收益率 | `GET /v1/data/us10y` | `type=1D/1W/1M` |
| DXY 美元指数 | `GET /v1/data/dxy` | `type=1D/1W/1M` |
| 全球 M2 供应量 | `GET /v1/data/m2_supply` | `type=3M/6M/1Y/3Y` |
| Bitfinex 多头持仓 | `GET /v1/data/bitfinex_long` | `symbol=btc` `type=1D/1W/1M/h24` |
| 主流合约平台数据 | `GET /v1/data/contract` | `dataType=1D/1W/1M/3M/6M/12M` |
| 抄底逃顶指标 | `GET /v1/data/bottom_top_indicator` | 无 |
| 链上净流入前十 | `GET /v1/data/top10_netflow` | `network=solana/base/ethereum` |
| 合约交易所快照 | `GET /v1/data/exchanges` | `name` `page` `size` |

---

## 时间维度自动映射

| 用户说 | 参数 |
|--------|------|
| 今天 / 最新 / 实时 | `type=1D` 或 `size=5` |
| 这周 / 近期 | `type=1W` |
| 这个月 / 最近一个月 | `type=1M` |
| 今年 / 长期趋势 | `type=1Y` 或 `type=3Y` |
| 最近24小时（仅 bitfinex_long）| `type=h24` |

---

## 意图映射表

| 用户意图 | 场景/接口 |
|---------|----------|
| 今天市场怎么样 / 每日速览 | 场景一：市场速览 |
| 资金流向 / 链上热点 / 聪明钱 | 场景二：资金流向 |
| 宏观环境 / M2 / 美债 / 适合入场吗 | 场景三：宏观环境 |
| 合约 / 未平仓合约 / 合约平台 / 杠杆风险 | 场景四：合约市场 |
| 搜索 [关键词] | 场景五：搜索 |
| 最新快讯 / 快讯列表 | `GET /v1/newsflash` |
| 重要快讯 | `GET /v1/newsflash/important` |
| 原创快讯 | `GET /v1/newsflash/original` |
| 首发快讯 | `GET /v1/newsflash/first` |
| 链上快讯 | `GET /v1/newsflash/onchain` |
| 融资快讯 / 融资新闻 | `GET /v1/newsflash/financing` |
| 预测市场 / Polymarket | `GET /v1/newsflash/prediction` |
| AI 快讯 / AI 新闻 | `GET /v1/newsflash?type=ai` |
| 文章列表 | `GET /v1/article` |
| 重要文章 | `GET /v1/article/important` |
| 原创文章 | `GET /v1/article/original` |
| BTC ETF 流入 | `GET /v1/data/btc_etf` |
| IBIT FBTC | `GET /v1/data/ibit_fbtc` |
| 稳定币市值 / USDT USDC | `GET /v1/data/stablecoin_marketcap` |
| 美元指数 / DXY | `GET /v1/data/dxy` |
| Bitfinex 多头 / 杠杆持仓 | `GET /v1/data/bitfinex_long` |
| 抄底逃顶 / 市场情绪 | `GET /v1/data/bottom_top_indicator` |
| 净流入代币 / 链上热门 | `GET /v1/data/top10_netflow` |
| 合约交易所排名 | `GET /v1/data/exchanges` |
| 链上交易量 / 链上活跃度 | `GET /v1/data/daily_tx` |
| 合规交易所资产 / 机构托管 | `GET /v1/data/compliant_total` |

---

## 数据刷新频率

| 接口类型 | 更新频率 |
|---------|---------|
| 快讯 / 文章 / 搜索 | 实时 |
| top10_netflow | 近实时 |
| btc_etf / ibit_fbtc / daily_tx | 每日（T+1）|
| stablecoin_marketcap / compliant_total | 每日 |
| bottom_top_indicator | 每日 |
| us10y / dxy | 盘中分钟级更新 |
| m2_supply | 月度 |
| exchanges / contract | 每日 |
| bitfinex_long | 每日（h24 参数近实时）|

---

## 错误处理

| 错误情况 | 处理方式 |
|---------|---------|
| 未设置 `BLOCKBEATS_API_KEY` | 提示：请先设置环境变量 BLOCKBEATS_API_KEY，申请地址：https://www.theblockbeats.info/ |
| HTTP 401 | 提示：API Key 无效或已过期，请检查密钥是否正确 |
| HTTP 403 | 提示：当前套餐无权访问该接口，请升级套餐 |
| status 非 0 | 显示 message 字段内容 |
| 接口超时 | 提示重试，不影响其他并行接口的结果展示 |
| data 为空数组 | 说明可能原因（非交易日、数据延迟、该币种暂无数据） |

## 注意事项

- `content` 字段为 HTML，展示时剥离标签只显示纯文本
- `create_time` 字段为字符串格式 `Y-m-d H:i:s`
- 数值字段（price/vol等）为字符串类型，展示时可格式化为数字
- 并行请求时任一接口失败不应中断其他接口的展示
