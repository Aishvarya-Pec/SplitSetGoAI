export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://splitsetgo.app";
  const now = new Date().toISOString();
  const routes = ["/", "/about", "/faq", "/contact", "/dashboard"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changefreq: "weekly",
    priority: p === "/" ? 1 : 0.6,
  }));
  return routes;
}


