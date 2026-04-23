export type Registry<T> = {
    add: (key: string, value: T) => void
    remove: (key: string) => void
    clear: () => void
    resolve: (type: string) => T | null
}

export function createRegistry<T>(init?: Record<string, T>): Registry<T> {
    const map = new Map<string, T>()

    if (init) {
        for (const [key, value] of Object.entries(init)) {
            map.set(key, value)
        }
    }

    return {
        add: (key: string, value: T) => { map.set(key, value) },
        remove: (key: string) => { map.delete(key) },
        clear: () => map.clear(),
        resolve: (type: string): T | null => map.get(type) ?? null,
    }
}