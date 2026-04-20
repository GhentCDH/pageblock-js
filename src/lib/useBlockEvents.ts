import { computed } from 'vue'
import type { EventMap } from '../types/types'
import { useActionRegistry } from './actionRegistry.ts'

function toArray<T>(v: T | T[]): T[] {
  return Array.isArray(v) ? v : [v]
}

export function useBlockEvents(
  getProps: () => { on?: EventMap; blockKey?: string; blockType: string },
) {
  const actionRegistry = useActionRegistry()

  const domHandlers = computed(() => {
    const { on, blockKey, blockType } = getProps()
    if (!on || !actionRegistry) return {}
    return Object.fromEntries(
      Object.entries(on).map(([eventName, descriptors]) => [
        eventName,
        (event: Event) => {
          const opts = { eventName, event, blockType, blockKey }
          toArray(descriptors).forEach(d => actionRegistry.dispatch(d, opts))
        },
      ])
    )
  })

  return { domHandlers }
}
