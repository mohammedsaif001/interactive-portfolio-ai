import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Saif | Senior Software Engineer",
    short_name: "Mohammed Saif",
    description: "Interactive portfolio of Mohammed Saif, Senior Software Engineer in Bangalore. Full-stack and GenAI.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ec",
    theme_color: "#ffdf6e",
    icons: [
      { src: "/icons/icon.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
