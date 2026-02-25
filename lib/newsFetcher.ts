import axios from "axios";
import Parser from "rss-parser";

const parser = new Parser();

interface NewsItem {
    title: string;
    url: string;
    source: string;
    content: string;
    topic: string;
}

const TOPICS = [
    "blockchain",
    "crypto",
    "bitcoin",
    "ethereum",
    "web3 india",
    "crypto regulation india",
    "CBDC india",
    "digital rupee",
];

export async function fetchWeb3News(): Promise<NewsItem[]> {
    const allNews: NewsItem[] = [];

    // 1. Fetch from NewsAPI
    try {
        const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            TOPICS.join(" OR ")
        )}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await axios.get(newsApiUrl);
        const articles = response.data.articles || [];

        articles.forEach((article: any) => {
            allNews.push({
                title: article.title,
                url: article.url,
                source: article.source.name,
                content: article.description || article.content || "",
                topic: "Web3",
            });
        });
    } catch (error) {
        console.error("NewsAPI Fetch Error:", error);
    }

    // 2. Fetch from RSS Feeds (CoinDesk, CoinTelegraph)
    const rssFeeds = [
        { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
        { name: "CoinTelegraph", url: "https://cointelegraph.com/rss" },
    ];

    for (const feed of rssFeeds) {
        try {
            const feedData = await parser.parseURL(feed.url);
            feedData.items.slice(0, 5).forEach((item) => {
                allNews.push({
                    title: item.title || "",
                    url: item.link || "",
                    source: feed.name,
                    content: item.contentSnippet || item.content || "",
                    topic: "Crypto",
                });
            });
        } catch (error) {
            console.error(`RSS Fetch Error (${feed.name}):`, error);
        }
    }

    return allNews;
}
