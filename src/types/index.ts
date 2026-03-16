export type GeneratorFormData = {
  productName: string;
  features: string;
  tone: string;
  language: string;
};

export type GeneratedContent = {
  seoTitle: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  keywords: string[];
};