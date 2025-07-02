export function cleanAndSplit(str) {
    return str
      .replace(/ *\([^)]*\) */g, "") // quita '(...)' :contentReference[oaicite:6]{index=6}
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  