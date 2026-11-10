import type { MetadataRoute } from "next";
import { siteUrl } from "@/constants/seo";

// Search engines and AI answer engines are all welcome: a portfolio wants to be found and quoted.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bytespider", "Amazonbot", "cohere-ai", "Meta-ExternalAgent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
