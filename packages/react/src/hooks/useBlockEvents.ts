import { useMemo } from 'react'
import { createActionDispatcher, toArray, type EventMap } from '@pageblocks/core'
import { useActionRegistry } from '../context/RegistryContext'

export function useBlockEvents(
  on: EventMap | undefined,
  blockType: string,
  blockKey?: string,
): Record<string, (e: unknown) => void> {
  const actionRegistry = useActionRegistry()

  return useMemo(() => {
    if (!on) return {}
    const actionDispatcher = createActionDispatcher(actionRegistry)
    return Object.fromEntries(
      Object.entries(on).map(([eventName, descriptors]) => {
        const reactName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
        return [
          reactName,
          (e: unknown) => {
            const opts = { eventName, event: e ?? null, args: [e], blockType, blockKey }
            toArray(descriptors).forEach(d => actionDispatcher.dispatch(d, opts))
          },
        ]
      })
    )
  }, [on, blockType, blockKey, actionRegistry])
}
