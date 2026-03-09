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

export const categories: Category[] = [
  {
    slug: "video-ai",
    name: { tr: "Video AI", en: "Video AI" },
    seoIntro: {
      tr: "Video AI kategorisinde en iyi araclari karsilastir, fiyatlarini incele ve is akisini hizlandir.",
      en: "Discover top Video AI tools, compare features and pick the best platform for your workflow.",
    },
  },
  {
    slug: "marketing-ai",
    name: { tr: "Marketing AI", en: "Marketing AI" },
    seoIntro: {
      tr: "Marketing AI araclari ile kampanyalari optimize et, daha hizli icerik uret ve donusumu artir.",
      en: "Explore Marketing AI platforms to optimize campaigns, produce faster content and improve conversion.",
    },
  },
  {
    slug: "productivity-ai",
    name: { tr: "Productivity AI", en: "Productivity AI" },
    seoIntro: {
      tr: "Productivity AI araclari ile planlama, not alma ve otomasyon sureclerini tek yerden yonet.",
      en: "Use Productivity AI tools to improve planning, note-taking and automation in one place.",
    },
  },
  {
    slug: "coding-ai",
    name: { tr: "Coding AI", en: "Coding AI" },
    seoIntro: {
      tr: "Coding AI araclariyla kod inceleme, test ve dokumantasyon surecini hizlandir.",
      en: "Boost development speed with Coding AI tools for code reviews, testing and documentation.",
    },
  },
  {
    slug: "image-ai",
    name: { tr: "Image AI", en: "Image AI" },
    seoIntro: {
      tr: "Image AI araclari ile gorsel olusturma, duzenleme ve marka varliklarini tek panelde yonet.",
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
      tr: "Yazma, arastirma ve otomasyon icin cok amacli AI asistani.",
      en: "A versatile AI assistant for writing, research and automation.",
    },
    fullDescription: {
      tr: "ChatGPT ekiplerin icerik uretimini, veri analizini ve destek sureclerini hizlandiran genel amacli bir yapay zeka asistanidir.",
      en: "ChatGPT is a general-purpose AI assistant that helps teams speed up content production, analysis and support workflows.",
    },
    category: "productivity-ai",
    website: "https://chatgpt.com",
    tags: ["ai", "gpt", "assistant"],
    faqs: [
      {
        question: {
          tr: "ChatGPT hangi kullanim senaryolari icin uygundur?",
          en: "What use cases is ChatGPT good for?",
        },
        answer: {
          tr: "Icerik yazimi, fikir uretimi, teknik dokumantasyon ve musteri destek akislari icin uygundur.",
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
      tr: "Uzun metinler ve analiz odakli gelismis yapay zeka asistani.",
      en: "Advanced AI assistant focused on long-form reasoning and analysis.",
    },
    fullDescription: {
      tr: "Claude ozellikle uzun dokumanlar, stratejik analiz ve guvenli kurumsal kullanim icin tercih edilir.",
      en: "Claude is commonly used for long documents, strategic analysis and safer enterprise usage.",
    },
    category: "productivity-ai",
    website: "https://claude.ai",
    tags: ["ai", "assistant", "analysis"],
    faqs: [
      {
        question: {
          tr: "Claude ile ChatGPT arasindaki fark nedir?",
          en: "How does Claude differ from ChatGPT?",
        },
        answer: {
          tr: "Genellikle uzun baglam ve detayli analiz performansinda one cikar.",
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
      tr: "Video olusturma ve duzenleme icin uretilmis AI platformu.",
      en: "AI-native platform for video creation and editing.",
    },
    fullDescription: {
      tr: "Runway metinden videoya, sahne duzenleme ve post-production adimlarini hizlandirir.",
      en: "Runway accelerates text-to-video generation, scene editing and post-production workflows.",
    },
    category: "video-ai",
    website: "https://runwayml.com",
    tags: ["video", "gen-ai", "editing"],
    faqs: [
      {
        question: {
          tr: "Runway hangi ekipler icin uygun?",
          en: "Who should use Runway?",
        },
        answer: {
          tr: "Icerik ekipleri, reklam ajanslari ve creator ekipleri icin idealdir.",
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
      tr: "Hizli sosyal medya videolari icin AI video uretec.",
      en: "Fast AI video generator for social content.",
    },
    fullDescription: {
      tr: "Pika kisa formatli videolar, reklam varyasyonlari ve hareketli gorseller uretmek icin kullanilir.",
      en: "Pika helps generate short-form videos, ad variants and motion creatives quickly.",
    },
    category: "video-ai",
    website: "https://pika.art",
    tags: ["video", "creator", "marketing"],
    faqs: [
      {
        question: {
          tr: "Pika profesyonel projelerde kullanilir mi?",
          en: "Can Pika be used in professional projects?",
        },
        answer: {
          tr: "Evet, hizli prototip ve kampanya testlerinde oldukca etkilidir.",
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
      tr: "Marka tonu odakli AI icerik ve pazarlama platformu.",
      en: "Brand-focused AI content and marketing platform.",
    },
    fullDescription: {
      tr: "Jasper ekiplerin blog, reklam metni ve landing page iceriklerini marka diline uygun bicimde olusturur.",
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
          tr: "Anahtar kelime odakli metin taslaklari olusturmada gucludur.",
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
      tr: "Pazarlama icerik akislari ve mesajlasma otomasyonu.",
      en: "Marketing workflows and messaging automation with AI.",
    },
    fullDescription: {
      tr: "Copy.ai email, sosyal medya ve satis metinlerinde hizli varyasyonlar ureterek ekiplerin kapasitesini artirir.",
      en: "Copy.ai scales marketing output by generating variants for emails, social and sales messaging.",
    },
    category: "marketing-ai",
    website: "https://www.copy.ai",
    tags: ["marketing", "sales", "copywriting"],
    faqs: [
      {
        question: {
          tr: "Copy.ai kimler icin uygun?",
          en: "Who should use Copy.ai?",
        },
        answer: {
          tr: "Growth, satis ve pazarlama ekipleri icin uygundur.",
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
      tr: "Kod tamamlama, test ve dokumantasyon icin coding AI.",
      en: "Coding AI assistant for completion, tests and docs.",
    },
    fullDescription: {
      tr: "Copilot gelistiricilerin kod yazma hizini artirir ve tekrarlayan gorevleri azaltir.",
      en: "Copilot boosts developer velocity and reduces repetitive coding tasks.",
    },
    category: "coding-ai",
    website: "https://github.com/features/copilot",
    tags: ["coding", "developer-tools", "ai"],
    faqs: [
      {
        question: {
          tr: "Copilot hangi IDE'lerde calisir?",
          en: "Which IDEs support Copilot?",
        },
        answer: {
          tr: "VS Code ve diger populer IDE'lerde eklenti olarak kullanilir.",
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
      tr: "Kod tabanini anlayan editor icinde AI yardimcisi.",
      en: "IDE-native AI assistant that understands your codebase.",
    },
    fullDescription: {
      tr: "Cursor, kod tabanina baglamsal olarak hakim olup hizli refactor ve debug akislari sunar.",
      en: "Cursor provides contextual refactoring and debugging workflows inside your editor.",
    },
    category: "coding-ai",
    website: "https://www.cursor.com",
    tags: ["coding", "refactor", "developer-tools"],
    faqs: [
      {
        question: {
          tr: "Cursor ekip kullanimina uygun mu?",
          en: "Is Cursor suitable for teams?",
        },
        answer: {
          tr: "Evet, ozellikle hizli prototipleme ve bakim sureclerinde verimlidir.",
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
      tr: "Yaratıcı gorseller icin yuksek kaliteli image AI.",
      en: "High-quality image AI for creative visuals.",
    },
    fullDescription: {
      tr: "Midjourney kampanya gorselleri, konsept tasarimlari ve ilham panolari icin yaygin sekilde kullanilir.",
      en: "Midjourney is widely used for campaign visuals, concept art and creative exploration.",
    },
    category: "image-ai",
    website: "https://www.midjourney.com",
    tags: ["image", "design", "creative"],
    faqs: [
      {
        question: {
          tr: "Midjourney ticari kullanim icin uygun mu?",
          en: "Can Midjourney be used commercially?",
        },
        answer: {
          tr: "Paket ve lisans sartlarina gore ticari kullanim mumkundur.",
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
      tr: "Metinden gorsele hizli uretim yapan image AI modeli.",
      en: "Text-to-image model for rapid visual generation.",
    },
    fullDescription: {
      tr: "DALL-E 3 marka gorselleri, sunum varliklari ve sosyal medya kreatifleri uretmek icin kullanilir.",
      en: "DALL-E 3 is used for brand assets, presentation visuals and social media creative work.",
    },
    category: "image-ai",
    website: "https://openai.com/dall-e-3",
    tags: ["image", "generator", "design"],
    faqs: [
      {
        question: {
          tr: "DALL-E 3 ne kadar hizli?",
          en: "How fast is DALL-E 3?",
        },
        answer: {
          tr: "Prompt karmasikligina gore saniyeler icinde sonuc uretebilir.",
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
      tr: "Not alma ve bilgi yonetimini AI ile hizlandirir.",
      en: "Speeds up note-taking and knowledge workflows with AI.",
    },
    fullDescription: {
      tr: "Notion AI toplanti notlari, wiki sayfalari ve gorev yonetimi iceriklerinde ekip verimliligini artirir.",
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
          tr: "Operasyon, urun ve proje ekipleri icin oldukca kullanislidir.",
          en: "It is very useful for operations, product and project teams.",
        },
      },
    ],
    relatedSlugs: ["chatgpt", "claude"],
    trendingScore: 84,
    createdAt: "2026-01-26",
  },
];

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
