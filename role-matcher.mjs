/**
 * role-matcher.mjs — Fuzzy role title matching for tracker deduplication.
 * Minimal implementation matching documented behavior.
 */

const ROLE_STOPWORDS = new Set([
  'senior', 'junior', 'staff', 'principal', 'lead', 'associate', 'mid',
  'remote', 'hybrid', 'onsite', 'contract', 'full', 'time', 'part',
  'the', 'and', 'for', 'with', 'new', 'role', 'position', 'job',
  'experienced', 'entry', 'level', 'us', 'usa', 'latam', 'emea',
  'i', 'ii', 'iii', 'iv', 'v',
]);

const SHORT_SPECIALTY = new Set(['api', 'sre', 'sdk', 'gpu', 'llm', 'ml', 'ai', 'ios', 'qa']);

const BASELINE_TOKENS = new Set([
  'software', 'engineer', 'developer', 'manager', 'engineering', 'development',
  'backend', 'frontend', 'fullstack', 'stack', 'platform', 'infrastructure',
]);

/**
 * Convert a role title into a normalized token set for comparison.
 * @param {string} role
 * @returns {Set<string>}
 */
export function roleTokens(role) {
  return new Set(
    role.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t && !ROLE_STOPWORDS.has(t) && (t.length > 3 || SHORT_SPECIALTY.has(t)))
  );
}

/**
 * Fuzzy-match two role titles using shared token count, discriminating tokens, and Jaccard.
 * Returns true when they likely describe the same opening.
 *
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function roleFuzzyMatch(a, b) {
  const ta = roleTokens(a);
  const tb = roleTokens(b);
  if (ta.size === 0 || tb.size === 0) return false;

  const shared = new Set([...ta].filter(t => tb.has(t)));
  if (shared.size < 2) return false;

  // At least one discriminating (non-baseline) shared token
  const hasDiscriminating = [...shared].some(t => !BASELINE_TOKENS.has(t));
  if (!hasDiscriminating) return false;

  // Jaccard similarity
  const union = new Set([...ta, ...tb]);
  const jaccard = shared.size / union.size;
  return jaccard >= 0.6;
}
