import fs from 'fs';

export function loadAllowedOrigins(): string[] {
  const env = process.env.ALLOWED_ORIGINS;
  if (env) {
    // Try JSON first, fall back to CSV
    try {
      const parsed = JSON.parse(env);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch (_) {
      // ignore JSON parse error
    }
    return env.split(',').map(s => s.trim()).filter(Boolean);
  } 
  return []
}
