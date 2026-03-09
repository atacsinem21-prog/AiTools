export type Locale = "tr" | "en";

export type Category = {
  slug: string;
  name: Record<Locale, string>;
  seoIntro: Record<Locale, string>;
};

export type Tool = {
  slug: string;
  name: string;
  logo: string;
  shortDescription: Record<Locale, string>;
  fullDescription: Record<Locale, string>;
  category: string;
  website: string;
  tags: string[];
  faqs: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
  relatedSlugs: string[];
  trendingScore: number;
  createdAt: string;
};

export type PricingModel = "free" | "freemium" | "paid";

export type ToolPricing = {
  model: PricingModel;
  startingAtUsdMonthly: number | null;
};

export const categories: Category[] = [
  {
    slug: "video-ai",
    name: { tr: "Video AI", en: "Video AI" },
    seoIntro: {
      tr: "Video AI kategorisinde en iyi araçları karşılaştır, fiyatlarını incele ve iş akışını hızlandır.",
      en: "Discover top Video AI tools, compare features and pick the best platform for your workflow.",
    },
  },
  {
    slug: "marketing-ai",
    name: { tr: "Marketing AI", en: "Marketing AI" },
    seoIntro: {
      tr: "Marketing AI araçları ile kampanyaları optimize et, daha hızlı içerik üret ve dönüşümü artır.",
      en: "Explore Marketing AI platforms to optimize campaigns, produce faster content and improve conversion.",
    },
  },
  {
    slug: "productivity-ai",
    name: { tr: "Productivity AI", en: "Productivity AI" },
    seoIntro: {
      tr: "Productivity AI araçları ile planlama, not alma ve otomasyon süreçlerini tek yerden yönet.",
      en: "Use Productivity AI tools to improve planning, note-taking and automation in one place.",
    },
  },
  {
    slug: "coding-ai",
    name: { tr: "Coding AI", en: "Coding AI" },
    seoIntro: {
      tr: "Coding AI araçlarıyla kod inceleme, test ve dokümantasyon sürecini hızlandır.",
      en: "Boost development speed with Coding AI tools for code reviews, testing and documentation.",
    },
  },
  {
    slug: "image-ai",
    name: { tr: "Image AI", en: "Image AI" },
    seoIntro: {
      tr: "Image AI araçları ile görsel oluşturma, düzenleme ve marka varlıklarını tek panelde yönet.",
      en: "Generate and edit visuals with Image AI tools built for creators, teams and brands.",
    },
  },
];

export const tools: Tool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    shortDescription: {
      tr: "Yazma, araştırma ve otomasyon için çok amaçlı AI asistanı.",
      en: "A versatile AI assistant for writing, research and automation.",
    },
    fullDescription: {
      tr: "ChatGPT ekiplerin içerik üretimini, veri analizini ve destek süreçlerini hızlandıran genel amaçlı bir yapay zeka asistanıdır.",
      en: "ChatGPT is a general-purpose AI assistant that helps teams speed up content production, analysis and support workflows.",
    },
    category: "productivity-ai",
    website: "https://chatgpt.com",
    tags: ["ai", "gpt", "assistant"],
    faqs: [
      {
        question: {
          tr: "ChatGPT hangi kullanım senaryoları için uygundur?",
          en: "What use cases is ChatGPT good for?",
        },
        answer: {
          tr: "İçerik yazımı, fikir üretimi, teknik dokümantasyon ve müşteri destek akışları için uygundur.",
          en: "It works well for content writing, ideation, technical docs and customer support flows.",
        },
      },
    ],
    relatedSlugs: ["claude", "notion-ai"],
    trendingScore: 99,
    createdAt: "2026-01-20",
  },
  {
    slug: "claude",
    name: "Claude",
    logo: "/logos/claude.svg",
    shortDescription: {
      tr: "Uzun metinler ve analiz odaklı gelişmiş yapay zeka asistanı.",
      en: "Advanced AI assistant focused on long-form reasoning and analysis.",
    },
    fullDescription: {
      tr: "Claude özellikle uzun dokümanlar, stratejik analiz ve güvenli kurumsal kullanım için tercih edilir.",
      en: "Claude is commonly used for long documents, strategic analysis and safer enterprise usage.",
    },
    category: "productivity-ai",
    website: "https://claude.ai",
    tags: ["ai", "assistant", "analysis"],
    faqs: [
      {
        question: {
          tr: "Claude ile ChatGPT arasındaki fark nedir?",
          en: "How does Claude differ from ChatGPT?",
        },
        answer: {
          tr: "Genellikle uzun bağlam ve detaylı analiz performansında öne çıkar.",
          en: "It often stands out for long-context handling and in-depth analysis.",
        },
      },
    ],
    relatedSlugs: ["chatgpt", "jasper"],
    trendingScore: 91,
    createdAt: "2026-02-02",
  },
  {
    slug: "runway",
    name: "Runway",
    logo: "/logos/runway.svg",
    shortDescription: {
      tr: "Video oluşturma ve düzenleme için üretilmiş AI platformu.",
      en: "AI-native platform for video creation and editing.",
    },
    fullDescription: {
      tr: "Runway metinden videoya, sahne düzenleme ve post-production adımlarını hızlandırır.",
      en: "Runway accelerates text-to-video generation, scene editing and post-production workflows.",
    },
    category: "video-ai",
    website: "https://runwayml.com",
    tags: ["video", "gen-ai", "editing"],
    faqs: [
      {
        question: {
          tr: "Runway hangi ekipler için uygun?",
          en: "Who should use Runway?",
        },
        answer: {
          tr: "İçerik ekipleri, reklam ajansları ve creator ekipleri için idealdir.",
          en: "Great for content teams, agencies and creators producing visual assets.",
        },
      },
    ],
    relatedSlugs: ["pika", "midjourney"],
    trendingScore: 95,
    createdAt: "2026-02-16",
  },
  {
    slug: "pika",
    name: "Pika",
    logo: "/logos/pika.svg",
    shortDescription: {
      tr: "Hızlı sosyal medya videoları için AI video üretici.",
      en: "Fast AI video generator for social content.",
    },
    fullDescription: {
      tr: "Pika kısa formatlı videolar, reklam varyasyonları ve hareketli görseller üretmek için kullanılır.",
      en: "Pika helps generate short-form videos, ad variants and motion creatives quickly.",
    },
    category: "video-ai",
    website: "https://pika.art",
    tags: ["video", "creator", "marketing"],
    faqs: [
      {
        question: {
          tr: "Pika profesyonel projelerde kullanılır mı?",
          en: "Can Pika be used in professional projects?",
        },
        answer: {
          tr: "Evet, hızlı prototip ve kampanya testlerinde oldukça etkilidir.",
          en: "Yes, it is effective for rapid prototyping and campaign experiments.",
        },
      },
    ],
    relatedSlugs: ["runway"],
    trendingScore: 88,
    createdAt: "2026-02-24",
  },
  {
    slug: "jasper",
    name: "Jasper",
    logo: "/logos/jasper.svg",
    shortDescription: {
      tr: "Marka tonu odaklı AI içerik ve pazarlama platformu.",
      en: "Brand-focused AI content and marketing platform.",
    },
    fullDescription: {
      tr: "Jasper ekiplerin blog, reklam metni ve landing page içeriklerini marka diline uygun biçimde oluşturur.",
      en: "Jasper helps teams create blog, ad and landing page copy aligned with brand voice.",
    },
    category: "marketing-ai",
    website: "https://www.jasper.ai",
    tags: ["marketing", "copywriting", "seo"],
    faqs: [
      {
        question: {
          tr: "Jasper SEO metinlerinde etkili mi?",
          en: "Is Jasper good for SEO copy?",
        },
        answer: {
          tr: "Anahtar kelime odaklı metin taslakları oluşturmada güçlüdür.",
          en: "It is strong at drafting keyword-focused SEO content.",
        },
      },
    ],
    relatedSlugs: ["copy-ai", "chatgpt"],
    trendingScore: 85,
    createdAt: "2026-01-29",
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    logo: "/logos/copyai.svg",
    shortDescription: {
      tr: "Pazarlama içerik akışları ve mesajlaşma otomasyonu.",
      en: "Marketing workflows and messaging automation with AI.",
    },
    fullDescription: {
      tr: "Copy.ai email, sosyal medya ve satış metinlerinde hızlı varyasyonlar üreterek ekiplerin kapasitesini artırır.",
      en: "Copy.ai scales marketing output by generating variants for emails, social and sales messaging.",
    },
    category: "marketing-ai",
    website: "https://www.copy.ai",
    tags: ["marketing", "sales", "copywriting"],
    faqs: [
      {
        question: {
          tr: "Copy.ai kimler için uygun?",
          en: "Who should use Copy.ai?",
        },
        answer: {
          tr: "Growth, satış ve pazarlama ekipleri için uygundur.",
          en: "Great fit for growth, sales and marketing teams.",
        },
      },
    ],
    relatedSlugs: ["jasper"],
    trendingScore: 80,
    createdAt: "2026-01-21",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    logo: "/logos/copilot.svg",
    shortDescription: {
      tr: "Kod tamamlama, test ve dokümantasyon için coding AI.",
      en: "Coding AI assistant for completion, tests and docs.",
    },
    fullDescription: {
      tr: "Copilot geliştiricilerin kod yazma hızını artırır ve tekrarlayan görevleri azaltır.",
      en: "Copilot boosts developer velocity and reduces repetitive coding tasks.",
    },
    category: "coding-ai",
    website: "https://github.com/features/copilot",
    tags: ["coding", "developer-tools", "ai"],
    faqs: [
      {
        question: {
          tr: "Copilot hangi IDE'lerde çalışır?",
          en: "Which IDEs support Copilot?",
        },
        answer: {
          tr: "VS Code ve diğer popüler IDE'lerde eklenti olarak kullanılır.",
          en: "It runs as an extension in VS Code and other popular IDEs.",
        },
      },
    ],
    relatedSlugs: ["cursor-ai", "chatgpt"],
    trendingScore: 93,
    createdAt: "2026-01-17",
  },
  {
    slug: "cursor-ai",
    name: "Cursor",
    logo: "/logos/cursor.svg",
    shortDescription: {
      tr: "Kod tabanını anlayan editör içinde AI yardımcısı.",
      en: "IDE-native AI assistant that understands your codebase.",
    },
    fullDescription: {
      tr: "Cursor, kod tabanına bağlamsal olarak hakim olup hızlı refactor ve debug akışları sunar.",
      en: "Cursor provides contextual refactoring and debugging workflows inside your editor.",
    },
    category: "coding-ai",
    website: "https://www.cursor.com",
    tags: ["coding", "refactor", "developer-tools"],
    faqs: [
      {
        question: {
          tr: "Cursor ekip kullanımına uygun mu?",
          en: "Is Cursor suitable for teams?",
        },
        answer: {
          tr: "Evet, özellikle hızlı prototipleme ve bakım süreçlerinde verimlidir.",
          en: "Yes, especially useful for rapid prototyping and maintenance tasks.",
        },
      },
    ],
    relatedSlugs: ["github-copilot", "chatgpt"],
    trendingScore: 90,
    createdAt: "2026-03-01",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    logo: "/logos/midjourney.svg",
    shortDescription: {
      tr: "Yaratıcı görseller için yüksek kaliteli image AI.",
      en: "High-quality image AI for creative visuals.",
    },
    fullDescription: {
      tr: "Midjourney kampanya görselleri, konsept tasarımları ve ilham panoları için yaygın şekilde kullanılır.",
      en: "Midjourney is widely used for campaign visuals, concept art and creative exploration.",
    },
    category: "image-ai",
    website: "https://www.midjourney.com",
    tags: ["image", "design", "creative"],
    faqs: [
      {
        question: {
          tr: "Midjourney ticari kullanım için uygun mu?",
          en: "Can Midjourney be used commercially?",
        },
        answer: {
          tr: "Paket ve lisans şartlarına göre ticari kullanım mümkündür.",
          en: "Commercial use is possible depending on your plan and license terms.",
        },
      },
    ],
    relatedSlugs: ["dalle-3"],
    trendingScore: 92,
    createdAt: "2026-02-11",
  },
  {
    slug: "dalle-3",
    name: "DALL-E 3",
    logo: "/logos/dalle.svg",
    shortDescription: {
      tr: "Metinden görsele hızlı üretim yapan image AI modeli.",
      en: "Text-to-image model for rapid visual generation.",
    },
    fullDescription: {
      tr: "DALL-E 3 marka görselleri, sunum varlıkları ve sosyal medya kreatifleri üretmek için kullanılır.",
      en: "DALL-E 3 is used for brand assets, presentation visuals and social media creative work.",
    },
    category: "image-ai",
    website: "https://openai.com/dall-e-3",
    tags: ["image", "generator", "design"],
    faqs: [
      {
        question: {
          tr: "DALL-E 3 ne kadar hızlı?",
          en: "How fast is DALL-E 3?",
        },
        answer: {
          tr: "Prompt karmaşıklığına göre saniyeler içinde sonuç üretebilir.",
          en: "It usually generates outputs in seconds, depending on prompt complexity.",
        },
      },
    ],
    relatedSlugs: ["midjourney"],
    trendingScore: 86,
    createdAt: "2026-02-03",
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    logo: "/logos/notion.svg",
    shortDescription: {
      tr: "Not alma ve bilgi yönetimini AI ile hızlandırır.",
      en: "Speeds up note-taking and knowledge workflows with AI.",
    },
    fullDescription: {
      tr: "Notion AI toplantı notları, wiki sayfaları ve görev yönetimi içeriklerinde ekip verimliliğini artırır.",
      en: "Notion AI improves team productivity across notes, wikis and task documentation.",
    },
    category: "productivity-ai",
    website: "https://www.notion.so/product/ai",
    tags: ["productivity", "notes", "workspace"],
    faqs: [
      {
        question: {
          tr: "Notion AI hangi ekiplerde etkili?",
          en: "Which teams benefit most from Notion AI?",
        },
        answer: {
          tr: "Operasyon, ürün ve proje ekipleri için oldukça kullanışlıdır.",
          en: "It is very useful for operations, product and project teams.",
        },
      },
    ],
    relatedSlugs: ["chatgpt", "claude"],
    trendingScore: 84,
    createdAt: "2026-01-26",
  },
];

export const toolPricingBySlug: Record<string, ToolPricing> = {
  chatgpt: { model: "freemium", startingAtUsdMonthly: 20 },
  claude: { model: "freemium", startingAtUsdMonthly: 20 },
  runway: { model: "paid", startingAtUsdMonthly: 15 },
  pika: { model: "freemium", startingAtUsdMonthly: 10 },
  jasper: { model: "paid", startingAtUsdMonthly: 39 },
  "copy-ai": { model: "freemium", startingAtUsdMonthly: 36 },
  "github-copilot": { model: "paid", startingAtUsdMonthly: 10 },
  "cursor-ai": { model: "freemium", startingAtUsdMonthly: 20 },
  midjourney: { model: "paid", startingAtUsdMonthly: 10 },
  "dalle-3": { model: "paid", startingAtUsdMonthly: 20 },
  "notion-ai": { model: "freemium", startingAtUsdMonthly: 10 },
};

export function getToolPricing(slug: string): ToolPricing {
  return toolPricingBySlug[slug] ?? { model: "paid", startingAtUsdMonthly: null };
}

export function getPricingText(locale: Locale, slug: string) {
  const pricing = getToolPricing(slug);
  const modelLabel =
    pricing.model === "free"
      ? locale === "tr"
        ? "Ucretsiz"
        : "Free"
      : pricing.model === "freemium"
        ? "Freemium"
        : locale === "tr"
          ? "Ucretli"
          : "Paid";

  if (pricing.startingAtUsdMonthly == null || pricing.model === "free") {
    return modelLabel;
  }

  return locale === "tr"
    ? `${modelLabel} - ${pricing.startingAtUsdMonthly}$ / ay`
    : `${modelLabel} - $${pricing.startingAtUsdMonthly}/mo`;
}

export function getToolRating(slug: string) {
  const tool = getToolBySlug(slug);
  if (!tool) return 4.0;
  const normalized = Math.max(0, Math.min(1, tool.trendingScore / 100));
  return Number((4 + normalized).toFixed(1));
}

export const landingSlugs = [
  "best-ai-tools",
  "free-ai-tools",
  "new-ai-tools",
  "ai-tools-list",
  "top-ai-tools",
  "ai-tools-for-writing",
  "ai-tools-for-video-editing",
  "ai-tools-for-marketing",
  "ai-tools-for-students",
  "ai-tools-for-business",
  "ai-tools-for-coding",
  "ai-tools-for-design",
  "ai-tools-for-youtube",
  "ai-tools-for-instagram",
  "ai-tools-for-startups",
  "chatgpt-vs-claude",
  "midjourney-vs-dalle",
  "notion-ai-vs-chatgpt",
  "jasper-vs-copy-ai",
  "runway-vs-pika",
  "best-free-ai-tools-for-students",
  "best-ai-tools-for-youtube-creators",
  "best-ai-tools-for-content-creation",
  "best-ai-tools-for-social-media",
  "best-ai-tools-for-blogging",
  "best-ai-tools-for-seo",
  "best-ai-tools-for-productivity",
  "best-ai-tools-for-graphic-design",
  "best-ai-tools-for-video-generation",
  "best-ai-tools-for-startups",
  "new-ai-startups",
  "trending-ai-tools",
  "latest-ai-tools",
  "ai-tools-launched-this-week",
  "ai-startup-directory",
  "best-ai-writing-tools",
  "best-ai-sales-tools",
  "best-ai-tools-for-agencies",
  "best-ai-tools-for-founders",
  "best-ai-tools-for-developers",
  "best-ai-tools-for-designers",
  "best-ai-tools-for-ecommerce",
  "best-ai-tools-for-email-marketing",
  "best-ai-tools-for-automation",
  "best-ai-research-tools",
  "best-ai-tools-for-content-teams",
  "best-ai-tools-for-product-teams",
  "best-ai-tools-for-small-business",
  "best-ai-tools-for-video-teams",
  "best-ai-tools-for-creators",
  "best-ai-tools-for-education",
  "best-ai-tools-for-teachers",
  "best-ai-tools-for-recruiters",
  "best-ai-tools-for-hr",
  "best-ai-tools-for-product-managers",
  "best-ai-tools-for-ux-design",
  "best-ai-tools-for-analytics",
  "best-ai-tools-for-legal-teams",
  "best-ai-tools-for-customer-support",
  "best-ai-tools-for-finance",
  "best-ai-tools-for-researchers",
  "best-ai-tools-for-mobile-apps",
  "best-ai-tools-for-saas-growth",
  "best-ai-tools-for-b2b-marketing",
  "best-ai-tools-for-startup-operations",
] as const;

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categorySlug: string) {
  return tools.filter((tool) => tool.category === categorySlug);
}

export function getTrendingTools() {
  return [...tools].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 6);
}

export function getNewTools() {
  return [...tools]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 6);
}

export type ComparePair = {
  slug: string;
  leftToolSlug: string;
  rightToolSlug: string;
};

export const comparePairs: ComparePair[] = [
  { slug: "chatgpt-vs-claude", leftToolSlug: "chatgpt", rightToolSlug: "claude" },
  { slug: "midjourney-vs-dalle", leftToolSlug: "midjourney", rightToolSlug: "dalle-3" },
  { slug: "notion-ai-vs-chatgpt", leftToolSlug: "notion-ai", rightToolSlug: "chatgpt" },
  { slug: "jasper-vs-copy-ai", leftToolSlug: "jasper", rightToolSlug: "copy-ai" },
  { slug: "runway-vs-pika", leftToolSlug: "runway", rightToolSlug: "pika" },
];

export function getComparePairBySlug(slug: string) {
  return comparePairs.find((pair) => pair.slug === slug);
}
