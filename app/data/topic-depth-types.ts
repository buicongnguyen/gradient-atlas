export type DepthLanguage = "en" | "vi" | "ko";

export type LocalizedDepthText = Record<DepthLanguage, string>;

export type TopicDepth = {
  core: LocalizedDepthText;
  example: LocalizedDepthText;
};

export const depth = (
  coreEn: string,
  coreVi: string,
  coreKo: string,
  exampleEn: string,
  exampleVi: string,
  exampleKo: string,
): TopicDepth => ({
  core: { en: coreEn, vi: coreVi, ko: coreKo },
  example: { en: exampleEn, vi: exampleVi, ko: exampleKo },
});
