const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const OUTPUT_DIR = path.join(__dirname, "output");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// All known core pages from sitemap and site structure
const CORE_PAGES = [
  "https://www.mgmcet.ac.in",
  "https://www.mgmcet.ac.in/about-us",
  "https://www.mgmcet.ac.in/btech",
  "https://www.mgmcet.ac.in/btech-ai-ml",
  "https://www.mgmcet.ac.in/btech-cse",
  "https://www.mgmcet.ac.in/btech-cybersecurity",
  "https://www.mgmcet.ac.in/btech-ece",
  "https://www.mgmcet.ac.in/btech-me",
  "https://www.mgmcet.ac.in/mtech",
  "https://www.mgmcet.ac.in/mtech-iic",
  "https://www.mgmcet.ac.in/mtech-se-cm",
  "https://www.mgmcet.ac.in/polytechnic",
  "https://www.mgmcet.ac.in/training-and-placement-cell",
  "https://www.mgmcet.ac.in/campus-life",
  "https://www.mgmcet.ac.in/sports-club",
  "https://www.mgmcet.ac.in/associations-and-clubs",
  "https://www.mgmcet.ac.in/womencell",
  "https://www.mgmcet.ac.in/arts-club",
  "https://www.mgmcet.ac.in/nss",
  "https://www.mgmcet.ac.in/nss-2020-2021",
  "https://www.mgmcet.ac.in/nss-2019-2020",
  "https://www.mgmcet.ac.in/faculty",
  "https://www.mgmcet.ac.in/careers",
  "https://www.mgmcet.ac.in/news-and-events",
  "https://www.mgmcet.ac.in/research-and-development",
  "https://www.mgmcet.ac.in/aicte-feedback-facility",
  "https://www.mgmcet.ac.in/grevance-cell",
  "https://www.mgmcet.ac.in/iqac",
  "https://www.mgmcet.ac.in/mou-s",
  "https://www.mgmcet.ac.in/anti-ragging",
  "https://www.mgmcet.ac.in/blank-5",
];

// Helper to convert URL to file slug
function urlToSlug(url) {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname.replace(/^\/|\/$/g, "");
    if (!pathname) return "home";
    return pathname.replace(/[\/\?&=%:]+/g, "-");
  } catch (e) {
    return "page-" + Math.random().toString(36).substring(7);
  }
}

async function scrapePage(browser, url) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  console.log(`[CRAWL] Fetching: ${url}`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  } catch (err) {
    console.warn(`[WARN] domcontentloaded timed out for ${url}: ${err.message}`);
  }

  // Brief pause for Wix client scripts to hydrate and mount DOM
  await new Promise((r) => setTimeout(r, 2500));

  // Scroll down page to trigger lazy loading
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight || totalHeight > 12000) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 80);
      });
    });
    await new Promise((r) => setTimeout(r, 1000));
  } catch (e) {
    console.warn(`[WARN] Scroll failed on ${url}:`, e.message);
  }

  // Extract structured data
  let pageData;
  try {
    pageData = await page.evaluate((pageUrl) => {
      const title = document.title || "";
      const metaDesc =
        document.querySelector('meta[name="description"]')?.getAttribute("content") || "";

      // Headings
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: (h.innerText || "").trim(),
      })).filter((h) => h.text.length > 0);

      // Paragraphs
      const paragraphs = Array.from(document.querySelectorAll("p"))
        .map((p) => (p.innerText || "").trim())
        .filter((t) => t.length > 0);

      // Lists
      const lists = Array.from(document.querySelectorAll("ul, ol")).map((list) => {
        return Array.from(list.querySelectorAll("li"))
          .map((li) => (li.innerText || "").trim())
          .filter((t) => t.length > 0);
      }).filter((l) => l.length > 0);

      // Tables
      const tables = Array.from(document.querySelectorAll("table")).map((table) => {
        return Array.from(table.querySelectorAll("tr")).map((tr) => {
          return Array.from(tr.querySelectorAll("th, td")).map((td) =>
            (td.innerText || "").trim()
          );
        });
      });

      // Links (internal, external, PDFs, docs)
      const links = Array.from(document.querySelectorAll("a[href]")).map((a) => {
        const href = a.getAttribute("href") || "";
        const text = (a.innerText || "").trim();
        const isPdf =
          href.toLowerCase().includes(".pdf") ||
          href.includes("filesusr.com") ||
          href.includes("ugd/");
        return { href, text, isPdf };
      });

      // Images
      const images = [];
      document.querySelectorAll("img, wow-image, [data-image-info]").forEach((el) => {
        let src = el.getAttribute("src") || "";
        if (!src && el.getAttribute("data-src")) src = el.getAttribute("data-src");
        const alt = el.getAttribute("alt") || "";
        if (src) {
          images.push({ src, alt });
        }
      });

      document.querySelectorAll('[style*="background-image"], [style*="url("]').forEach((el) => {
        const style = el.getAttribute("style") || "";
        const match = style.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
        if (match && match[1]) {
          images.push({ src: match[1], alt: "Background image" });
        }
      });

      const uniqueImages = [];
      const seenSrcs = new Set();
      for (const img of images) {
        if (!seenSrcs.has(img.src)) {
          seenSrcs.add(img.src);
          uniqueImages.push(img);
        }
      }

      const fullText = (document.body ? document.body.innerText : "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .join("\n");

      return {
        url: pageUrl,
        title,
        metaDesc,
        headings,
        paragraphs,
        lists,
        tables,
        links,
        images: uniqueImages,
        fullText,
      };
    }, url);
  } catch (err) {
    console.error(`[ERROR] Extraction failed on ${url}:`, err.message);
    pageData = {
      url,
      title: "",
      metaDesc: "",
      headings: [],
      paragraphs: [],
      lists: [],
      tables: [],
      links: [],
      images: [],
      fullText: "",
      error: err.message,
    };
  }

  await page.close().catch(() => {});
  return pageData;
}

async function main() {
  console.log("=== Launching Chrome Headless for Fast Optimized Scraping ===");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const discoveredNewsUrls = new Set();
  const scrapedPages = [];

  console.log(`Step 1a: Scraping ${CORE_PAGES.length} core pages...`);
  for (const url of CORE_PAGES) {
    try {
      const data = await scrapePage(browser, url);
      scrapedPages.push(data);
      const slug = urlToSlug(url);
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${slug}.json`),
        JSON.stringify(data, null, 2),
        "utf8"
      );
      console.log(`[SAVED] ${slug}.json (${data.paragraphs.length} paras, ${data.images.length} imgs, ${data.links.filter(l=>l.isPdf).length} pdfs)`);

      for (const link of data.links) {
        if (!link.href) continue;
        if (link.href.startsWith("https://www.mgmcet.ac.in/news/")) {
          discoveredNewsUrls.add(link.href.split("?")[0]);
        }
      }
    } catch (err) {
      console.error(`[ERROR] Failed to scrape ${url}:`, err.message);
    }
  }

  // Fetch sitemap news URLs as well
  try {
    const sitemapNewsUrl = "https://www.mgmcet.ac.in/dynamic-news_p_1b2fb60d_d25b_4b52_ba69_79d32390db69_0_5000-sitemap.xml";
    console.log("Step 1b: Fetching news sitemap directly...");
    const res = await fetch(sitemapNewsUrl);
    const text = await res.text();
    const matches = text.match(/<loc>(https:\/\/www\.mgmcet\.ac\.in\/news\/[^<]+)<\/loc>/g) || [];
    for (const m of matches) {
      const u = m.replace("<loc>", "").replace("</loc>", "");
      discoveredNewsUrls.add(u);
    }
    console.log(`Total news articles found in sitemap & nav: ${discoveredNewsUrls.size}`);
  } catch (e) {
    console.warn("Could not fetch news sitemap directly:", e.message);
  }

  console.log(`Step 1c: Scraping top 20 real news articles...`);
  const newsList = Array.from(discoveredNewsUrls).slice(0, 25);
  for (const newsUrl of newsList) {
    try {
      const data = await scrapePage(browser, newsUrl);
      scrapedPages.push(data);
      const slug = urlToSlug(newsUrl);
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${slug}.json`),
        JSON.stringify(data, null, 2),
        "utf8"
      );
      console.log(`[SAVED NEWS] ${slug}.json`);
    } catch (err) {
      console.error(`[ERROR] Failed news ${newsUrl}:`, err.message);
    }
  }

  await browser.close();

  // Generate content-audit.md
  console.log("Step 1d: Writing content-audit.md...");
  let auditMarkdown = `# Content Audit: MGM College of Engineering and Technology (MGMCET)
Generated from live headless crawl of https://www.mgmcet.ac.in/

Total Pages Crawled: ${scrapedPages.length}

## Page Inventory & Content Breakdown

| Page Title | URL | Headings | Paragraphs | Images | PDFs / Docs | Content in Images/PDFs Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
`;

  for (const page of scrapedPages) {
    const pdfLinks = page.links.filter((l) => l.isPdf);
    const pdfSummary = pdfLinks.length > 0 ? `${pdfLinks.length} PDFs` : "None";
    const notes = [];
    if (page.images.length > 0 && page.paragraphs.length < 3) {
      notes.push("Flyer/banner heavy page");
    }
    if (pdfLinks.length > 0) {
      notes.push(`Document links present (${pdfLinks.slice(0, 2).map(p => p.text || 'Doc').join(', ')})`);
    }
    if (notes.length === 0) {
      notes.push("Clean DOM text");
    }

    auditMarkdown += `| ${(page.title || "No Title").replace(/\|/g, "-")} | [${page.url}](${page.url}) | ${page.headings.length} | ${page.paragraphs.length} | ${page.images.length} | ${pdfSummary} | ${notes.join("; ")} |\n`;
  }

  auditMarkdown += `\n## All Discovered Document & PDF Links\n\n`;
  const allPdfs = new Map();
  for (const page of scrapedPages) {
    for (const l of page.links) {
      if (l.isPdf && !allPdfs.has(l.href)) {
        allPdfs.set(l.href, { text: l.text, fromUrl: page.url });
      }
    }
  }

  for (const [href, info] of allPdfs.entries()) {
    auditMarkdown += `- [${info.text || "Download Document"}](${href}) (from ${info.fromUrl})\n`;
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "content-audit.md"), auditMarkdown, "utf8");
  console.log(`[DONE] Finished! Output saved to scripts/scrape/output/content-audit.md`);
}

main().catch(console.error);
