import { z } from 'zod';
import { MAKER_CATEGORY_KEYS } from '@aihot/industry/maker-categories';

// Only keyword searches: dates, accounts, paging and costs remain program-controlled.
export const discoveryPlanSchema = z.object({
  searches: z.array(z.object({
    category: z.enum(MAKER_CATEGORY_KEYS),
    query: z.string().trim().min(3).max(180)
      .refine(q => !/[:@\r\n\x00-\x1f]/.test(q), 'Use keywords, not accounts or search operators')
      .refine(q => /\b(?:AI|LLM|artificial intelligence|machine learning)\b|人工智能/i.test(q), 'Include AI relevance'),
    reason: z.string().min(1).max(200),
  })).length(4),
}).refine(plan => new Set(plan.searches.map(s => s.category)).size === 4, 'Cover all four categories')
  .refine(plan => new Set(plan.searches.map(s => s.query.toLowerCase())).size === 4, 'Use distinct queries');

export function discoveryDay(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}

export function discoveredHandle(value: unknown): string | null {
  return typeof value === 'string' && /^[a-zA-Z0-9_]{1,15}$/.test(value) ? value.toLowerCase() : null;
}
