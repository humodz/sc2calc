import assetsJson from './assets.json';

export function getAsset(name: string) {
  return assetsJson[name as keyof typeof assetsJson]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeAny = any

export function mapValues<K extends keyof UnsafeAny, T, R>(
  obj: Record<K, T>, fn: (k: K, v: T) => R
): Record<K, R> {
    const result: UnsafeAny = {}

    for (const key of Object.keys(obj)) {
      const unsafeKey = key as K
      result[key] = fn(unsafeKey, obj[unsafeKey])
    }

    return result
}

export function updateRecord<T, V>(key: keyof T, value: V) {
  return ((old: T) => ({
    ...old,
    [key]: value,
  }))
}

export function parseInteger(text: string) {
  return Number(text.replace(/[^\d]/g, ''));
}

const base = document.querySelector('base')!.href;

export function cssUrl(relativeUrl: string) {
  const url = new URL(relativeUrl, base);
  return `url("${encodeURI(url.toString())}")`;
}