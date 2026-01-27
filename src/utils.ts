import assetsJson from './assets.json';

export function getAsset(name: string) {
  return assetsJson[name as keyof typeof assetsJson]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnsafeAny = any

export function mapValues<K extends keyof UnsafeAny, T, R>(
    obj: Record<K, T>, fn: (v: T) => R
): Record<K, R> {
    const result: UnsafeAny = {}

    for (const key of Object.keys(obj)) {
        result[key] = fn((obj as UnsafeAny)[key])
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