// Neon's HTTP driver occasionally hits a transient "fetch failed" on cold
// or flaky connections. A couple of quick retries smooths that over without
// masking genuine errors (bad query, missing table, etc.), which fail fast.
function isTransientError(error: unknown): boolean {
  let current: unknown = error;
  for (let depth = 0; current && depth < 5; depth++) {
    const message = current instanceof Error ? current.message : String(current);
    if (/fetch failed|ECONNRESET|ETIMEDOUT|network/i.test(message)) return true;
    current = current instanceof Error ? current.cause : undefined;
  }
  return false;
}

export async function withRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 300): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isTransientError(error) || attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
    }
  }
  throw lastError;
}
