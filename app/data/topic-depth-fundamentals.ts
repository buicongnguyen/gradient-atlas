import { fundamentalsADTopicDepth } from "./topic-depth-fundamentals-a-d.ts";
import { fundamentalsEKTopicDepth } from "./topic-depth-fundamentals-e-k.ts";
import type { TopicDepth } from "./topic-depth-types.ts";

export const fundamentalsTopicDepth: Record<string, TopicDepth> = {
  ...fundamentalsADTopicDepth,
  ...fundamentalsEKTopicDepth,
};
