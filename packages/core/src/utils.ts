export function toArray<T>(v: T | T[]): T[] {
  return Array.isArray(v) ? v : [v]
}
