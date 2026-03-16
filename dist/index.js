#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const BASE_URL = "http://api-pro.theblockbeats.info";
function getApiKey() {
    const key = process.env.BLOCKBEATS_API_KEY;
    if (!key) {
        throw new Error("未设置 BLOCKBEATS_API_KEY 环境变量，请先申请：https://www.theblockbeats.info/");
    }
    return key;
}
async function fetchApi(path, params) {
    const apiKey = getApiKey();
    const url = new URL(`${BASE_URL}${path}`);
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            url.searchParams.set(k, v);
        }
    }
    const res = await fetch(url.toString(), {
        headers: { "api-key": apiKey },
    });
    if (res.status === 401)
        throw new Error("API Key 无效或已过期，请检查密钥是否正确");
    if (res.status === 403)
        throw new Error("当前套餐无权访问该接口，请升级套餐");
    if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.status !== 0)
        throw new Error(json.message || "API 返回错误");
    return json.data;
}
const server = new index_js_1.Server({ name: "blockbeats-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "get_newsflash",
            description: "获取加密货币快讯，支持按分类（全部/重要/原创/首发/链上/融资/预测/AI）、页码和语言筛选",
            inputSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        enum: ["all", "important", "original", "first", "onchain", "financing", "prediction", "ai"],
                        default: "all",
                        description: "快讯分类：all全部 | important重要 | original原创 | first首发 | onchain链上 | financing融资 | prediction预测市场 | ai(AI快讯)",
                    },
                    page: { type: "integer", minimum: 1, default: 1, description: "页码" },
                    size: { type: "integer", minimum: 1, maximum: 100, default: 10, description: "每页数量" },
                    lang: { type: "string", enum: ["cn", "en"], default: "cn", description: "语言" },
                },
            },
        },
        {
            name: "get_articles",
            description: "获取加密货币深度文章，支持按分类（全部/重要/原创）和页码筛选",
            inputSchema: {
                type: "object",
                properties: {
                    category: {
                        type: "string",
                        enum: ["all", "important", "original"],
                        default: "all",
                        description: "文章分类：all全部 | important重要 | original原创",
                    },
                    page: { type: "integer", minimum: 1, default: 1, description: "页码" },
                    size: { type: "integer", minimum: 1, maximum: 100, default: 10, description: "每页数量" },
                    lang: { type: "string", enum: ["cn", "en"], default: "cn", description: "语言" },
                },
            },
        },
        {
            name: "search_news",
            description: "按关键词搜索快讯和文章",
            inputSchema: {
                type: "object",
                properties: {
                    keyword: { type: "string", minLength: 1, description: "搜索关键词" },
                    size: { type: "integer", minimum: 1, maximum: 100, default: 10, description: "返回数量" },
                    lang: { type: "string", enum: ["cn", "en"], default: "cn", description: "语言" },
                },
                required: ["keyword"],
            },
        },
        {
            name: "get_btc_etf_flow",
            description: "获取 BTC ETF 净流入数据（机构资金）",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_daily_onchain_tx",
            description: "获取每日链上交易量数据",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_ibit_fbtc_flow",
            description: "获取 IBIT/FBTC 净流入数据",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_stablecoin_marketcap",
            description: "获取 USDT、USDC 等主流稳定币市值数据",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_compliant_exchange_total",
            description: "获取主流合规交易所总资产",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_us_treasury_yield",
            description: "获取美国 10Y 国债收益率，支持多时间维度",
            inputSchema: {
                type: "object",
                properties: {
                    timeframe: {
                        type: "string",
                        enum: ["1D", "1W", "1M"],
                        default: "1D",
                        description: "时间维度：1D日 | 1W周 | 1M月",
                    },
                },
            },
        },
        {
            name: "get_dxy_index",
            description: "获取美元指数（DXY），支持多时间维度",
            inputSchema: {
                type: "object",
                properties: {
                    timeframe: {
                        type: "string",
                        enum: ["1D", "1W", "1M"],
                        default: "1D",
                        description: "时间维度：1D日 | 1W周 | 1M月",
                    },
                },
            },
        },
        {
            name: "get_m2_supply",
            description: "获取全球 M2 货币供应量，支持多时间维度",
            inputSchema: {
                type: "object",
                properties: {
                    timeframe: {
                        type: "string",
                        enum: ["3M", "6M", "1Y", "3Y"],
                        default: "1Y",
                        description: "时间维度：3M(3个月) | 6M(半年) | 1Y(1年) | 3Y(3年)",
                    },
                },
            },
        },
        {
            name: "get_bitfinex_long_positions",
            description: "获取 Bitfinex 杠杆多头持仓数据，反映大户做多情绪",
            inputSchema: {
                type: "object",
                properties: {
                    symbol: { type: "string", default: "btc", description: "币种符号，默认 btc" },
                    timeframe: {
                        type: "string",
                        enum: ["h24", "1D", "1W", "1M"],
                        default: "1D",
                        description: "时间维度：h24(24小时近实时) | 1D日 | 1W周 | 1M月",
                    },
                },
            },
        },
        {
            name: "get_contract_oi_data",
            description: "获取 Binance、Bybit、Hyperliquid 等主流合约平台未平仓合约（OI）数据",
            inputSchema: {
                type: "object",
                properties: {
                    dataType: {
                        type: "string",
                        enum: ["1D", "1W", "1M", "3M", "6M", "12M"],
                        default: "1D",
                        description: "时间维度：1D日 | 1W周 | 1M月 | 3M | 6M | 12M年",
                    },
                },
            },
        },
        {
            name: "get_sentiment_indicator",
            description: "获取抄底逃顶市场情绪指标（<20 潜在买入区间 / 20-80 中性 / >80 潜在卖出区间）",
            inputSchema: { type: "object", properties: {} },
        },
        {
            name: "get_top10_netflow",
            description: "获取指定链上净流入最多的前十个代币",
            inputSchema: {
                type: "object",
                properties: {
                    network: {
                        type: "string",
                        enum: ["solana", "base", "ethereum"],
                        default: "solana",
                        description: "区块链网络：solana | base | ethereum",
                    },
                },
            },
        },
        {
            name: "get_exchange_rankings",
            description: "获取合约交易所成交量和未平仓合约排名",
            inputSchema: {
                type: "object",
                properties: {
                    exchange_name: { type: "string", description: "交易所名称过滤（可选），如 Binance" },
                    page: { type: "integer", minimum: 1, default: 1, description: "页码" },
                    size: { type: "integer", minimum: 1, maximum: 100, default: 10, description: "每页数量" },
                },
            },
        },
    ],
}));
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (req) => {
    const { name, arguments: args = {} } = req.params;
    const a = args;
    try {
        let data;
        switch (name) {
            case "get_newsflash": {
                const category = a.category || "all";
                const params = {
                    page: String(a.page ?? 1),
                    size: String(a.size ?? 10),
                    lang: a.lang || "cn",
                };
                if (category === "ai") {
                    params.type = "ai";
                    data = await fetchApi("/v1/newsflash", params);
                }
                else if (category === "all") {
                    data = await fetchApi("/v1/newsflash", params);
                }
                else {
                    data = await fetchApi(`/v1/newsflash/${category}`, params);
                }
                break;
            }
            case "get_articles": {
                const category = a.category || "all";
                const params = {
                    page: String(a.page ?? 1),
                    size: String(a.size ?? 10),
                    lang: a.lang || "cn",
                };
                if (category === "all") {
                    data = await fetchApi("/v1/article", params);
                }
                else {
                    data = await fetchApi(`/v1/article/${category}`, params);
                }
                break;
            }
            case "search_news":
                data = await fetchApi("/v1/search", {
                    name: String(a.keyword),
                    size: String(a.size ?? 10),
                    lang: a.lang || "cn",
                });
                break;
            case "get_btc_etf_flow":
                data = await fetchApi("/v1/data/btc_etf");
                break;
            case "get_daily_onchain_tx":
                data = await fetchApi("/v1/data/daily_tx");
                break;
            case "get_ibit_fbtc_flow":
                data = await fetchApi("/v1/data/ibit_fbtc");
                break;
            case "get_stablecoin_marketcap":
                data = await fetchApi("/v1/data/stablecoin_marketcap");
                break;
            case "get_compliant_exchange_total":
                data = await fetchApi("/v1/data/compliant_total");
                break;
            case "get_us_treasury_yield":
                data = await fetchApi("/v1/data/us10y", { type: a.timeframe || "1D" });
                break;
            case "get_dxy_index":
                data = await fetchApi("/v1/data/dxy", { type: a.timeframe || "1D" });
                break;
            case "get_m2_supply":
                data = await fetchApi("/v1/data/m2_supply", { type: a.timeframe || "1Y" });
                break;
            case "get_bitfinex_long_positions":
                data = await fetchApi("/v1/data/bitfinex_long", {
                    symbol: a.symbol || "btc",
                    type: a.timeframe || "1D",
                });
                break;
            case "get_contract_oi_data":
                data = await fetchApi("/v1/data/contract", { dataType: a.dataType || "1D" });
                break;
            case "get_sentiment_indicator":
                data = await fetchApi("/v1/data/bottom_top_indicator");
                break;
            case "get_top10_netflow":
                data = await fetchApi("/v1/data/top10_netflow", {
                    network: a.network || "solana",
                });
                break;
            case "get_exchange_rankings": {
                const params = {
                    page: String(a.page ?? 1),
                    size: String(a.size ?? 10),
                };
                if (a.exchange_name)
                    params.name = String(a.exchange_name);
                data = await fetchApi("/v1/data/exchanges", params);
                break;
            }
            default:
                throw new Error(`未知工具: ${name}`);
        }
        return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
            content: [{ type: "text", text: `错误：${message}` }],
            isError: true,
        };
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("BlockBeats MCP Server 已启动");
}
main().catch((err) => {
    console.error("启动失败:", err);
    process.exit(1);
});
