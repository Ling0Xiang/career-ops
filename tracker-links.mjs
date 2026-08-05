/**
 * tracker-links.mjs — Normalize report links relative to the tracker file.
 * Minimal implementation — see #760 for context.
 */
import { resolve, relative, dirname } from 'path';

/**
 * Rewrite a markdown report link so the path is relative to the tracker file's dir.
 * Input links use root-relative `reports/...` or `../reports/...` notation.
 * Output links are relative to trackerDir.
 *
 * @param {string} reportField - Raw report cell, e.g. `[051](reports/051-foo-2026-06-14.md)`
 * @param {string} trackerDir - Absolute dir of applications.md
 * @param {string} reportsRoot - Absolute repo root where reports/ lives
 * @returns {string} Report field with path rewritten relative to trackerDir
 */
export function normalizeReportLink(reportField, trackerDir, reportsRoot) {
  if (!reportField) return reportField;
  return reportField.replace(/\]\(([^)]+)\)/g, (match, rawPath) => {
    // Only handle paths that point to reports/
    if (!/(?:^|\/|\.\.\/)*reports\//.test(rawPath)) return match;
    // Resolve the path against reportsRoot (handles both `reports/...` and `../reports/...`)
    const absPath = resolve(reportsRoot, rawPath.replace(/^(\.\.\/)*/, ''));
    // Recompute relative path from trackerDir to the absolute report path
    const relPath = relative(trackerDir, absPath).replace(/\\/g, '/');
    return `](${relPath})`;
  });
}
