import type { MetadataRoute } from "next";
import { siteUrl } from "@/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1, images: [`${siteUrl}/images/mohammed-saif.jpg`] },
    { url: `${siteUrl}/llms.txt`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
