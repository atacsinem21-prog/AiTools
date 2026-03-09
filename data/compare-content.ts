import type { Locale } from "@/data/tools";

export type ComparisonContent = {
  slug: string;
  heroSummary: Record<Locale, string>;
  longForm: Record<Locale, string>;
  featureComparison: Array<{
    key: string;
    label: Record<Locale, string>;
    left: string;
    right: string;
  }>;
  faqs: Array<{
    question: Record<Locale, string>;
    answer: Record<Locale, string>;
  }>;
};

export const comparisonContent: ComparisonContent[] = [
  {
    slug: "chatgpt-vs-claude",
    heroSummary: {
      tr: "ChatGPT hız ve çok yönlülükte öne çıkarken, Claude uzun bağlam ve detaylı analiz ihtiyaçlarında güçlüdür.",
      en: "ChatGPT stands out for speed and versatility, while Claude shines in long-context and detailed analysis tasks.",
    },
    longForm: {
      tr: "ChatGPT ve Claude karşılaştırmasında ihtiyaç senaryosu en kritik karar noktasıdır. ChatGPT, içerik üretimi, hızlı fikir geliştirme ve günlük operasyon akışlarında oldukça verimli bir yapı sunar. Claude ise özellikle uzun doküman analizi, stratejik planlama ve kapsamlı özetleme gibi görevlerde daha istikrarlı sonuç verebilir. Eğer ekip içinde kısa sürede çok sayıda varyasyon üretmek istiyorsanız ChatGPT daha pratik bir tercih olur. Uzun raporlar, hassas metin değerlendirmesi veya yüksek bağlam gerektiren analiz süreçleri için Claude ciddi avantaj sağlayabilir. Fiyatlandırma, entegrasyon ve ekip ihtiyaçlarını birlikte değerlendirerek hibrit kullanım modeli oluşturmak, çoğu takım için en iyi verimi üretir.",
      en: "In a ChatGPT vs Claude decision, your use case is the key factor. ChatGPT is highly effective for content production, quick ideation and day-to-day execution flows. Claude can be more consistent for long-document analysis, strategy-heavy tasks and deep summarization workflows. If your team needs fast iterations and high output volume, ChatGPT is often the more practical choice. If you handle large documents and context-heavy reasoning, Claude can provide stronger value. In many teams, a hybrid setup that combines speed-focused and analysis-focused workflows creates the best performance overall.",
    },
    featureComparison: [
      { key: "writing", label: { tr: "Yazı üretimi", en: "Content writing" }, left: "Very strong", right: "Strong" },
      { key: "longContext", label: { tr: "Uzun bağlam", en: "Long context" }, left: "Strong", right: "Very strong" },
      { key: "automation", label: { tr: "Otomasyon akışı", en: "Automation workflows" }, left: "Very strong", right: "Strong" },
      { key: "analysis", label: { tr: "Derin analiz", en: "Deep analysis" }, left: "Strong", right: "Very strong" },
    ],
    faqs: [
      {
        question: {
          tr: "ChatGPT mi Claude mu yeni başlayanlar için daha iyi?",
          en: "Which is better for beginners, ChatGPT or Claude?",
        },
        answer: {
          tr: "Genelde hızlı başlangıç ve çok amaçlı kullanım için ChatGPT daha kolaydır; analiz odaklı kullanımda Claude daha güçlü olabilir.",
          en: "ChatGPT is typically easier for quick onboarding and broad tasks, while Claude may be stronger for analysis-heavy workflows.",
        },
      },
    ],
  },
  {
    slug: "midjourney-vs-dalle",
    heroSummary: {
      tr: "Midjourney yaratıcı stil ve sanatsal kalite ile öne çıkar; DALL-E hızlı ve kontrol edilebilir üretim senaryolarında güçlüdür.",
      en: "Midjourney excels at artistic style and visual quality, while DALL-E is strong for fast and controllable image generation.",
    },
    longForm: {
      tr: "Midjourney ve DALL-E karşılaştırmasında hedef çıktının tipi çok önemlidir. Midjourney, estetik kalite, stil zenginliği ve yaratıcı varyasyon konusunda genellikle daha etkileyici sonuçlar sunar. DALL-E ise iş akışına hızlı entegrasyon, net prompt kontrolü ve pratik üretim süreçleri ile öne çıkar. Marka kreatiflerinde görsel kimlik tutarlılığı hedefleniyorsa DALL-E avantajlı olabilir. Daha özgün, sanatsal ve keşif odaklı görseller için Midjourney güçlü bir seçenek sunar. Karar verirken çıktı kalitesi, üretim hızı ve kullanım maliyetini birlikte değerlendirmek gerekir.",
      en: "In a Midjourney vs DALL-E comparison, the target output type matters most. Midjourney often delivers stronger artistic quality, style richness and creative variation. DALL-E stands out with faster workflow integration, clearer prompt control and practical production speed. For brand-focused and consistency-driven assets, DALL-E can be a better fit. For more experimental and artistic outcomes, Midjourney is typically stronger. The best choice depends on quality goals, generation speed and your cost constraints.",
    },
    featureComparison: [
      { key: "style", label: { tr: "Stil kalitesi", en: "Style quality" }, left: "Very strong", right: "Strong" },
      { key: "control", label: { tr: "Prompt kontrolü", en: "Prompt control" }, left: "Strong", right: "Very strong" },
      { key: "speed", label: { tr: "Üretim hızı", en: "Generation speed" }, left: "Strong", right: "Very strong" },
      { key: "creativity", label: { tr: "Yaratıcılık", en: "Creativity" }, left: "Very strong", right: "Strong" },
    ],
    faqs: [
      {
        question: {
          tr: "Sosyal medya kreatifleri için hangisi daha iyi?",
          en: "Which tool is better for social media creatives?",
        },
        answer: {
          tr: "Hız ve üretim akışı için DALL-E, estetik ve stil çeşitliliği için Midjourney genelde daha iyi sonuç verir.",
          en: "DALL-E is often better for speed and workflow, while Midjourney is stronger for artistic style and variation.",
        },
      },
    ],
  },
];

export function getComparisonContent(slug: string) {
  return comparisonContent.find((item) => item.slug === slug);
}
